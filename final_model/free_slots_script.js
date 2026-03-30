// Script to free specific slots
// Run this in browser console on any page of the parking app

function freeSpecificSlots() {
    // Get current booked slots from localStorage
    let bookedSlots = JSON.parse(localStorage.getItem("bookedSlots")) || {};
    
    console.log('Current booked slots:', bookedSlots);
    
    // Define all possible slot keys for both malls
    const nextGalleriaKeys = [
        'Next Galleria_2-Wheeler',
        'Next Galleria_4-Wheeler', 
        'Next Galleria_2-Wheeler_EV',
        'Next Galleria_4-Wheeler_EV'
    ];
    
    const inorbitKeys = [
        'Inorbit_2-Wheeler',
        'Inorbit_4-Wheeler',
        'Inorbit_2-Wheeler_EV', 
        'Inorbit_4-Wheeler_EV'
    ];
    
    let freed = [];
    
    // Free slot 13 in Next Galleria
    nextGalleriaKeys.forEach(key => {
        if (bookedSlots[key] && bookedSlots[key]['13']) {
            delete bookedSlots[key]['13'];
            freed.push(`Slot 13 in Next Galleria (${key})`);
            console.log(`Freed slot 13 from ${key}`);
        }
    });
    
    // Free slot 18 in Inorbit
    inorbitKeys.forEach(key => {
        if (bookedSlots[key] && bookedSlots[key]['18']) {
            delete bookedSlots[key]['18'];
            freed.push(`Slot 18 in Inorbit (${key})`);
            console.log(`Freed slot 18 from ${key}`);
        }
    });
    
    // Save updated slots back to localStorage
    localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
    
    console.log('Updated booked slots:', bookedSlots);
    
    if (freed.length > 0) {
        console.log('Successfully freed:', freed);
        alert('Successfully freed:\n' + freed.join('\n'));
    } else {
        console.log('No slots found to free. They might already be available.');
        alert('No slots found to free. They might already be available.');
    }
    
    return freed;
}

// Check current status
function checkSlotStatus() {
    const bookedSlots = JSON.parse(localStorage.getItem("bookedSlots")) || {};
    
    let status = [];
    
    // Check Next Galleria slot 13
    Object.keys(bookedSlots).forEach(key => {
        if (key.includes('Next Galleria') && bookedSlots[key] && bookedSlots[key]['13']) {
            status.push(`Slot 13 in Next Galleria (${key}) is OCCUPIED`);
        }
    });
    
    // Check Inorbit slot 18
    Object.keys(bookedSlots).forEach(key => {
        if (key.includes('Inorbit') && bookedSlots[key] && bookedSlots[key]['18']) {
            status.push(`Slot 18 in Inorbit (${key}) is OCCUPIED`);
        }
    });
    
    if (status.length > 0) {
        console.log('Occupied slots found:', status);
        return status;
    } else {
        console.log('Both slots are free!');
        return [];
    }
}

// Run the functions
console.log('=== Checking current slot status ===');
checkSlotStatus();

console.log('=== Freeing slots ===');
freeSpecificSlots();

console.log('=== Checking status after freeing ===');
checkSlotStatus();