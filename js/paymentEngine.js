// Maskiin Caawiye - USSD String & Verification Payment Engine
let currentPaymentTargetId = null;

function openVerifyModal(personId) {
    currentPaymentTargetId = personId;
    const people = StorageEngine.getPeople();
    const person = people.find(p => p.id === personId);
    if (!person) return;

    // Build Verification Prompt Options Container 
    const modalHtml = `
        <div class="modal d-block bg-dark bg-opacity-50" id="verifyPaymentModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5>Verify Target: ${person.fullName}</h5></div>
                    <div class="modal-body">
                        <p>Base Family Allocation: <strong>$${person.baseMoney}</strong></p>
                        <p>Children Component Allocation: <strong>$${person.totalCombinedAward - person.baseMoney}</strong></p>
                        <hr/>
                        <label>Select Scope of Evaluation:</label>
                        <select id="paymentScope" class="form-control mb-2" onchange="evalScopeSums('${person.id}')">
                            <option value="base">Base Family Only ($${person.baseMoney})</option>
                            <option value="full">Family + Children ($${person.totalCombinedAward})</option>
                        </select>
                        <div class="form-group mb-2">
                            <label>Add Holiday Package Allowance (Dharka Ciida):</label>
                            <input type="number" id="holidayAddon" class="form-control" value="0" oninput="evalScopeSums('${person.id}')">
                        </div>
                        <div class="form-group mb-2">
                            <label>Payment Gateway Service Provider:</label>
                            <select id="paymentMethod" class="form-control">
                                <option value="EVCPlus">EVC Plus (Default Mobile Gate)</option>
                                <option value="SomNet">SomNet</option>
                                <option value="eDahab">eDahab</option>
                            </select>
                        </div>
                        <h4 class="text-success mt-3">Calculated Target Sum: $<span id="calculatedTotalPay">${person.baseMoney}</span></h4>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closePaymentModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="executeUSSDDial('${person.id}')">Dial Code Now</button>
                    </div>
                </div>
            </div>
        </div>`;
    
    let container = document.getElementById("modalBoxWrapper");
    if(!container){
        container = document.createElement('div');
        container.id = "modalBoxWrapper";
        document.body.appendChild(container);
    }
    container.innerHTML = modalHtml;
}

function evalScopeSums(personId) {
    const person = StorageEngine.getPeople().find(p => p.id === personId);
    const scope = document.getElementById("paymentScope").value;
    const addon = parseFloat(document.getElementById("holidayAddon").value) || 0;
    
    let base = scope === "base" ? person.baseMoney : person.totalCombinedAward;
    document.getElementById("calculatedTotalPay").innerText = base + addon;
}

function closePaymentModal() {
    document.getElementById("verifyPaymentModal")?.remove();
}

function executeUSSDDial(personId) {
    const person = StorageEngine.getPeople().find(p => p.id === personId);
    const totalAmount = document.getElementById("calculatedTotalPay").innerText;
    const gate = document.getElementById("paymentMethod").value;

    // Format structure to match Somalia standard logic syntax string profiles safely 
    // Format: *712*DestinationNumber*Amount#
    const cleanPhone = person.phone.replace(/\s+/g, '');
    const ussdString = `*712*${cleanPhone}*${totalAmount}#`;
    
    if(confirm(`Initiating ${gate} Payment String via Device Modem:\n\n${ussdString}\n\nConfirm when transaction receipt settles to save record.`)) {
        // Record completed verification log entry event 
        StorageEngine.addTransaction({
            personId: person.id,
            name: person.fullName,
            phone: person.phone,
            gateway: gate,
            amount: parseFloat(totalAmount),
            ussdExecuted: ussdString,
            status: "Completed"
        });
        closePaymentModal();
        if(typeof renderPeopleTable === "function") renderPeopleTable();
    }
}