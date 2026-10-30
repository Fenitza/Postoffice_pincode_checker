const form = document.querySelector('#pincodeForm');
const pincodeInput = document.querySelector('#pincodeInput');
const checkButton = document.querySelector('#checkButton');
const statusMessage = document.querySelector('#statusMessage');
const resultsSection = document.querySelector('#resultsSection');
const resultsContainer = document.querySelector('#results');
const filterInput = document.querySelector('#filterInput');
const resultCount = document.querySelector('#resultCount');

let postOffices = [];

form.addEventListener('submit', checkPincode);
filterInput.addEventListener('input', filterPostOffices);

async function checkPincode(event) {
    event.preventDefault();

    const pincode = pincodeInput.value.trim();

    clearResults();

    if (!/^\d{6}$/.test(pincode)) {
        showMessage(
            'Please enter a valid six-digit numeric pincode.',
            'error'
        );
        return;
    }

    setLoading(true);
    showMessage('Checking pincode. Please wait...', 'loading');

    try {
        const response = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`
        );

        if (!response.ok) {
            throw new Error(
                `Request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        if (
            !Array.isArray(data) ||
            !data[0] ||
            data[0].Status !== 'Success' ||
            !Array.isArray(data[0].PostOffice) ||
            data[0].PostOffice.length === 0
        ) {
            showMessage(
                'No post offices found for this pincode. Please check the pincode and try again.',
                'error'
            );
            return;
        }

        postOffices = data[0].PostOffice;

        renderPostOffices(postOffices);

        resultsSection.hidden = false;

        showMessage(
            `Found ${postOffices.length} post office(s).`,
            'success'
        );
    } catch (error) {
        console.error('Error checking pincode:', error);

        showMessage(
            'Unable to retrieve pincode details. Please check your internet connection and try again.',
            'error'
        );
    } finally {
        setLoading(false);
    }
}

function renderPostOffices(offices) {
    resultsContainer.replaceChildren();

    offices.forEach((office) => {
        const card = createPostOfficeCard(office);
        resultsContainer.appendChild(card);
    });

    resultCount.textContent =
        `Showing ${offices.length} post office(s).`;
}

function createPostOfficeCard(office) {
    const card = document.createElement('article');
    card.className = 'post-office-card';

    const name = document.createElement('h3');
    name.textContent = office.Name || 'Name unavailable';

    const branchType = createDetail(
        'Branch Type',
        office.BranchType
    );

    const district = createDetail(
        'District',
        office.District
    );

    const state = createDetail(
        'State',
        office.State
    );

    const division = createDetail(
        'Division',
        office.Division
    );

    const pincode = createDetail(
        'Pincode',
        office.Pincode
    );

    card.append(
        name,
        branchType,
        district,
        state,
        division,
        pincode
    );

    return card;
}

function createDetail(label, value) {
    const paragraph = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = `${label}: `;

    paragraph.append(
        strong,
        document.createTextNode(
            value === null || value === undefined || value === ''
                ? 'Not available'
                : String(value)
        )
    );

    return paragraph;
}

function filterPostOffices() {
    const searchTerm = filterInput.value.trim().toLowerCase();

    const filteredOffices = postOffices.filter((office) => {
        const name = office.Name || '';

        return name.toLowerCase().includes(searchTerm);
    });

    renderPostOffices(filteredOffices);
}

function showMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

function clearResults() {
    postOffices = [];

    resultsContainer.replaceChildren();
    resultCount.textContent = '';
    filterInput.value = '';
    resultsSection.hidden = true;

    showMessage('', '');
}

function setLoading(isLoading) {
    checkButton.disabled = isLoading;
    checkButton.textContent = isLoading
        ? 'Checking...'
        : 'Check Pincode';

    pincodeInput.disabled = isLoading;
}