const MOST_USED_FUNDERS_FILE = './most_used_funders.json';
const URL_API_ROR = 'https://api.ror.org/v2/organizations/';

async function getMostUsedFunders() {
    const rors = await getRors();
    return await Promise.all(rors.map(ror => getOptionsData(ror)));
}

async function getOptionsData(ror){
    const ror_data = await callApiROR(ror);
    return constructDataROR(ror_data);
}

async function callApiROR(ror) {
    const ror_id = ror.split('/').pop();
    const response  = await fetch(`${URL_API_ROR}${ror_id}`)
    return await response.json();
}

function constructDataROR(data){
    const official = data.names.find(n => n.types.includes('ror_display'));
    const official_name = official ? official.value : null;
    const alt_names = data.names
    .filter(n => !n.types.includes('ror_display'))
    .map(n => n.value);

    return {
        id: data.id,
        text: official_name,
        alt_names: alt_names,
        searchText: [official_name, ...alt_names].join(' ')
    }
}

async function getRors() {
    const response = await fetch(MOST_USED_FUNDERS_FILE);
    const data = await response.json();
    return data.funders.map(funder => funder.ror);
}

async function fillFunderSelector() {
    const options = await getMostUsedFunders();

    const $select = $('#funder_select');
    
    $select.select2({
        data: options,
        placeholder: 'Select a funder',
        allowClear: true,
        matcher: function(params, data) {
            if ($.trim(params.term) === '') {
                return data;
            }

            const term = params.term.toLowerCase();
            const searchText = data.searchText.toLowerCase();

            if (searchText.indexOf(term) > -1) {
                return data;
            }

            return null;
        }
    });
}

document.addEventListener('DOMContentLoaded', fillFunderSelector);