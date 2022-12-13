const langCodesJSON = require("../lang_codes.json");

const __langCodes = Object.entries(langCodesJSON).map( e => e[0].toUpperCase() )

module.exports = {
    getLanguageCodes: () => {
        return __langCodes;
    }
}