// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jobs.json":[function(require,module,exports) {
module.exports = [{
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Senior Cataloguing Assistant",
  "url": "https://partnershipjobs.ca/jobs/31054",
  "organization": "Concordia University Library",
  "location": "Montréal, QC",
  "opened": "12 April, 2023",
  "closes": "25 April, 2023",
  "salary": "$57137.00"
}, {
  "position": "Customer & Community Services Specialist (full-time, permanent)",
  "url": "https://partnershipjobs.ca/jobs/31060",
  "organization": "East Gwillimbury Public Library",
  "location": "Holland Landing, ON",
  "opened": "14 April, 2023",
  "closes": "2 May, 2023",
  "salary": "$52,889"
}, {
  "position": "Page Supervisor - Regular Full Time",
  "url": "https://partnershipjobs.ca/jobs/31057",
  "organization": "Burnaby Public Library",
  "location": "Burnaby, BC",
  "opened": "13 April, 2023",
  "closes": "22 April, 2023",
  "salary": "$48025.00"
}, {
  "position": "Client Services Librarian - Bibliothécaire - service à la clientèle (Librarian I/II)",
  "url": "https://partnershipjobs.ca/jobs/31059",
  "organization": "University of Toronto Libraries",
  "location": "Toronto, ON",
  "opened": "14 April, 2023",
  "closes": "14 May, 2023",
  "salary": "$71,451"
}, {
  "position": "Library Services Assistant (23:043A)",
  "url": "https://partnershipjobs.ca/jobs/31055",
  "organization": "Northern Lights College",
  "location": "Dawson Creek, BC",
  "opened": "12 April, 2023",
  "closes": "11 July, 2023",
  "salary": "$24,232.39"
}, {
  "position": "Liaison Librarian, Macdonald Campus Library",
  "url": "https://partnershipjobs.ca/jobs/31053",
  "organization": "McGill University",
  "location": "Montréal, QC",
  "opened": "12 April, 2023",
  "closes": "19 May, 2023",
  "salary": "N/A"
}, {
  "position": "Research Data Services Librarian",
  "url": "https://partnershipjobs.ca/jobs/31052",
  "organization": "Trent University",
  "location": "Peterborough, ON",
  "opened": "12 April, 2023",
  "closes": "5 May, 2023",
  "salary": "$95,000"
}, {
  "position": "Young Adult and Adult Services Reference Librarian",
  "url": "https://partnershipjobs.ca/jobs/31056",
  "organization": "Moncton Public Library",
  "location": "Moncton, NB",
  "opened": "13 April, 2023",
  "closes": "2 May, 2023",
  "salary": "$49,166"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Librarian I",
  "url": "https://partnershipjobs.ca/jobs/31058",
  "organization": "Richmond Public Library",
  "location": "Richmond, BC",
  "opened": "13 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$61064.00"
}, {
  "position": "User Experience and Digital Accessibility Librarian",
  "url": "https://partnershipjobs.ca/jobs/31051",
  "organization": "University of British Columbia",
  "location": "Vancouver, BC",
  "opened": "12 April, 2023",
  "closes": "12 May, 2023",
  "salary": "$68,016"
}, {
  "position": "Information Services Librarian",
  "url": "https://partnershipjobs.ca/jobs/31041",
  "organization": "University of Doha for Science & Technology",
  "location": "Doha, DA",
  "opened": "10 April, 2023",
  "closes": "8 July, 2023",
  "salary": "$60"
}, {
  "position": "Library Assistant",
  "url": "https://partnershipjobs.ca/jobs/31049",
  "organization": "Lillooet Area Library Association",
  "location": "Lillooet, BC",
  "opened": "11 April, 2023",
  "closes": "10 July, 2023",
  "salary": "N/A"
}, {
  "position": "Public Service Assistant",
  "url": "https://partnershipjobs.ca/jobs/31050",
  "organization": "West Vancouver Memorial Library",
  "location": "West Vancouver, BC",
  "opened": "11 April, 2023",
  "closes": "25 April, 2023",
  "salary": "$45141.60"
}, {
  "position": "Library Branch Manager (Temporary 2 Month Contract Full-Time)",
  "url": "https://partnershipjobs.ca/jobs/31043",
  "organization": "New Tecumseth Public Library",
  "location": "Alliston, ON",
  "opened": "11 April, 2023",
  "closes": "18 April, 2023",
  "salary": "$70,452"
}, {
  "position": "Library Manager / Gestionnaire de bibliothèque",
  "url": "https://partnershipjobs.ca/jobs/31048",
  "organization": "Grand Falls Public Library - NBPLS",
  "location": "Grand Falls, NB",
  "opened": "11 April, 2023",
  "closes": "2 May, 2023",
  "salary": "$1,732"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Assistant Branch Supervisor - Bookmobile",
  "url": "https://partnershipjobs.ca/jobs/31046",
  "organization": "County of Bruce",
  "location": "Walkerton",
  "opened": "11 April, 2023",
  "closes": "30 April, 2023",
  "salary": "$54366.00"
}, {
  "position": "Senior Circulation and Branch Technician",
  "url": "https://partnershipjobs.ca/jobs/31047",
  "organization": "Sault Ste. Marie Public Library",
  "location": "SAULT STE MARIE, ON",
  "opened": "11 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$55454.00"
}, {
  "position": "Assistant Librarian & Digital Services",
  "url": "https://partnershipjobs.ca/jobs/31042",
  "organization": "Southgate Public Library",
  "location": "Dundalk, ON",
  "opened": "11 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$51,142.00"
}, {
  "position": "Librarian",
  "url": "https://partnershipjobs.ca/jobs/31045",
  "organization": "Legislative Assembly of BC",
  "location": "Victoria, BC",
  "opened": "11 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$70,427.28"
}, {
  "position": "Portfolio Manager, Service Design",
  "url": "https://partnershipjobs.ca/jobs/31044",
  "organization": "Ottawa Public Library",
  "location": "Ottawa, ON",
  "opened": "11 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$88,335.52"
}, {
  "position": "Head, User Experience Design and Planning",
  "url": "https://partnershipjobs.ca/jobs/31035",
  "organization": "University of Alberta Libraries",
  "location": "Edmonton , AB",
  "opened": "5 April, 2023",
  "closes": "15 May, 2023",
  "salary": "$87,828"
}, {
  "position": "Library Service Manager – Children’s Programs",
  "url": "https://partnershipjobs.ca/jobs/31038",
  "organization": "Toronto Public Library",
  "location": "Toronto, ON",
  "opened": "6 April, 2023",
  "closes": "21 April, 2023",
  "salary": "$103,429"
}, {
  "position": "Library Technician (Auxiliary) Lynn Valley Library (JP#23-07L)",
  "url": "https://partnershipjobs.ca/jobs/31037",
  "organization": "North Vancouver District Public Library",
  "location": "North Vancouver, BC",
  "opened": "6 April, 2023",
  "closes": "21 April, 2023",
  "salary": "$46631.00"
}, {
  "position": "Supervisor, Information Services (Full Time, 35 hrs/wk)",
  "url": "https://partnershipjobs.ca/jobs/31031",
  "organization": "Waterloo Public Library",
  "location": "Waterloo, ON",
  "opened": "5 April, 2023",
  "closes": "19 April, 2023",
  "salary": "N/A"
}, {
  "position": "Manager, Main Library",
  "url": "https://partnershipjobs.ca/jobs/31036",
  "organization": "Milton Public Library",
  "location": "Milton, ON",
  "opened": "6 April, 2023",
  "closes": "21 April, 2023",
  "salary": "$95,865.76"
}, {
  "position": "Supervisor, Children's Services & Community Engagement (full time, 35 hrs/wk)",
  "url": "https://partnershipjobs.ca/jobs/31032",
  "organization": "Waterloo Public Library",
  "location": "Waterloo, ON",
  "opened": "5 April, 2023",
  "closes": "19 April, 2023",
  "salary": "$59,696"
}, {
  "position": "Library Programmer & Assistant (Full Time, 35 hrs/wk)",
  "url": "https://partnershipjobs.ca/jobs/31033",
  "organization": "Waterloo Public Library",
  "location": "Waterloo, ON",
  "opened": "5 April, 2023",
  "closes": "19 April, 2023",
  "salary": "$53,580"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Librarian",
  "url": "https://partnershipjobs.ca/jobs/31039",
  "organization": "Olds College of Agriculture & Technology",
  "location": "Olds, AB",
  "opened": "6 April, 2023",
  "closes": "31 May, 2023",
  "salary": "N/A"
}, {
  "position": "​Administrative Assistant for Academic Library Consortium - CORRECTION TO POSTING",
  "url": "https://partnershipjobs.ca/jobs/31040",
  "organization": "Council of Prairie and Pacific University Libraries",
  "location": "Calgary, AB",
  "opened": "6 April, 2023",
  "closes": "30 April, 2023",
  "salary": "$30"
}, {
  "position": "Collection Maintenance & Library Assistant",
  "url": "https://partnershipjobs.ca/jobs/31034",
  "organization": "University of British Columbia",
  "location": "Vancouver, BC",
  "opened": "10 April, 2023",
  "closes": "24 April, 2023",
  "salary": "N/A"
}, {
  "position": "Library Assistant",
  "url": "https://partnershipjobs.ca/jobs/31023",
  "organization": "Kwantlen Polytechnic University",
  "location": "Surrey Upper West, BC",
  "opened": "3 April, 2023",
  "closes": "4 May, 2023",
  "salary": "$40273.00"
}, {
  "position": "Program and Engagement Manager",
  "url": "https://partnershipjobs.ca/jobs/31029",
  "organization": "Cochrane Public Library",
  "location": "Cochrane, AB",
  "opened": "3 April, 2023",
  "closes": "21 April, 2023",
  "salary": "$61,749.00"
}, {
  "position": "Program Manager, Content Services",
  "url": "https://partnershipjobs.ca/jobs/31022",
  "organization": "Ottawa Public Library",
  "location": "Ottawa, ON",
  "opened": "3 April, 2023",
  "closes": "18 April, 2023",
  "salary": "$105,581.84"
}, {
  "position": "Library Services-Librarian-Full-time-Limited Term Contract",
  "url": "https://partnershipjobs.ca/jobs/31027",
  "organization": "Ontario Tech University",
  "location": "Oshawa, ON",
  "opened": "4 April, 2023",
  "closes": "4 May, 2023",
  "salary": "$70,765"
}, {
  "position": "Digital Archivist",
  "url": "https://partnershipjobs.ca/jobs/31028",
  "organization": "University of British Columbia",
  "location": "Vancouver, BC",
  "opened": "5 April, 2023",
  "closes": "4 May, 2023",
  "salary": "$68,016"
}, {
  "position": "Library Assistant, Indigenous & IDEA",
  "url": "https://partnershipjobs.ca/jobs/31025",
  "organization": "Kwantlen Polytechnic University",
  "location": "Surrey, BC",
  "opened": "3 April, 2023",
  "closes": "3 May, 2023",
  "salary": "N/A"
}, {
  "position": "LIAISON LIBRARIAN, MARKETING (PART-TIME)",
  "url": "https://partnershipjobs.ca/jobs/31021",
  "organization": "Seneca Libraries",
  "location": "Toronto, ON",
  "opened": "3 April, 2023",
  "closes": "21 April, 2023",
  "salary": "$74715.00"
}, {
  "position": "Executive Director, BC Electronic Library Network (BC ELN)",
  "url": "https://partnershipjobs.ca/jobs/31030",
  "organization": "Simon Fraser University - Library",
  "location": "Burnaby, BC",
  "opened": "4 April, 2023",
  "closes": "8 May, 2023",
  "salary": "$106,462"
}, {
  "position": "Health Knowledge Network Librarian",
  "url": "https://partnershipjobs.ca/jobs/31026",
  "organization": "University of Calgary",
  "location": "Calgary, AB",
  "opened": "4 April, 2023",
  "closes": "3 May, 2023",
  "salary": "$65,578"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Branch Manager",
  "url": "https://partnershipjobs.ca/jobs/31024",
  "organization": "Markham Public Library",
  "location": "Markham, ON",
  "opened": "3 April, 2023",
  "closes": "24 April, 2023",
  "salary": "$98,582"
}, {
  "position": "Librarian, Program Development",
  "url": "https://partnershipjobs.ca/jobs/31018",
  "organization": "Ottawa Public Library",
  "location": "Ottawa, ON",
  "opened": "31 March, 2023",
  "closes": "17 April, 2023",
  "salary": "$70,326.62"
}, {
  "position": "COPPUL Digital Stewardship Coordinator",
  "url": "https://partnershipjobs.ca/jobs/31019",
  "organization": "Council of Prairie and Pacific University Libraries",
  "location": "anywhere in Canada, BC",
  "opened": "3 April, 2023",
  "closes": "12 May, 2023",
  "salary": "$70,000"
}, {
  "position": "Assistant Deputy Minister, Collections Sector",
  "url": "https://partnershipjobs.ca/jobs/31020",
  "organization": "Library and Archives Canada",
  "location": "Gatineau, QC",
  "opened": "28 March, 2023",
  "closes": "8 May, 2023",
  "salary": "$174,802"
}, {
  "position": "Technology Coordinator",
  "url": "https://partnershipjobs.ca/jobs/31016",
  "organization": "Squamish Public Library",
  "location": "Squamish, BC",
  "opened": "31 March, 2023",
  "closes": "1 May, 2023",
  "salary": "$60345.60"
}, {
  "position": "Librarian (Tenure-track) - (997077)",
  "url": "https://partnershipjobs.ca/jobs/31010",
  "organization": "Mount Royal University",
  "location": "Calgary, AB",
  "opened": "28 March, 2023",
  "closes": "24 April, 2023",
  "salary": "N/A"
}, {
  "position": "Librarian (3-year limited term) - (997979.3)",
  "url": "https://partnershipjobs.ca/jobs/31009",
  "organization": "Mount Royal University",
  "location": "Calgary, AB",
  "opened": "28 March, 2023",
  "closes": "24 April, 2023",
  "salary": "N/A"
}, {
  "position": "Collections Librarian Limited Term Appointment (ending April 30, 2025)",
  "url": "https://partnershipjobs.ca/jobs/31017",
  "organization": "Angus L. Macdonald Library - St. Francis Xavier University",
  "location": "Antigonish, NS",
  "opened": "31 March, 2023",
  "closes": "23 April, 2023",
  "salary": "$65,561"
}, {
  "position": "Librarian (9-month limited term) - (997076)",
  "url": "https://partnershipjobs.ca/jobs/31008",
  "organization": "Mount Royal University",
  "location": "Calgary, AB",
  "opened": "28 March, 2023",
  "closes": "24 April, 2023",
  "salary": "N/A"
}, {
  "position": "French Language Services Specialist",
  "url": "https://partnershipjobs.ca/jobs/31015",
  "organization": "Newfoundland and Labrador Public Libraries",
  "location": "Stephenville, NL",
  "opened": "31 March, 2023",
  "closes": "17 April, 2023",
  "salary": "$46,428.20"
}, {
  "position": "Director of Library Services",
  "url": "https://partnershipjobs.ca/jobs/31007",
  "organization": "The Stormont, Dundas and Glengarry County Library",
  "location": "CORNWALL, ON",
  "opened": "28 March, 2023",
  "closes": "21 April, 2023",
  "salary": "$115,009"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Research Librarian / Bibliothécaire de recherche",
  "url": "https://partnershipjobs.ca/jobs/31004",
  "organization": "Library of Parliament / Bibliothèque du Parlement",
  "location": "Ottawa, ON",
  "opened": "24 March, 2023",
  "closes": "22 June, 2023",
  "salary": "$66,822"
}, {
  "position": "Regional Library Assistant, Prince George, casual on-call",
  "url": "https://partnershipjobs.ca/jobs/30999",
  "organization": "Courthouse Library BC",
  "location": "Prince George, BC",
  "opened": "23 March, 2023",
  "closes": "21 June, 2023",
  "salary": "$42245.00"
}, {
  "position": "Librarian - Teen and New Adult",
  "url": "https://partnershipjobs.ca/jobs/31006",
  "organization": "Kingston Frontenac Public Library",
  "location": "Kingston, ON",
  "opened": "28 March, 2023",
  "closes": "28 April, 2023",
  "salary": "$70,743"
}, {
  "position": "Head, Access Services",
  "url": "https://partnershipjobs.ca/jobs/31005",
  "organization": "McMaster University",
  "location": "Hamilton, ON",
  "opened": "22 March, 2023",
  "closes": "18 April, 2023",
  "salary": "$72,139.43"
}, {
  "position": "Reference and Instruction Librarian (Librarian I/II)",
  "url": "https://partnershipjobs.ca/jobs/30991",
  "organization": "University of Toronto Libraries",
  "location": "Toronto, ON",
  "opened": "22 March, 2023",
  "closes": "20 April, 2023",
  "salary": "$71,451"
}, {
  "position": "Library Assistant",
  "url": "https://partnershipjobs.ca/jobs/30973",
  "organization": "Pemberton and District Public Library",
  "location": "Pemberton, BC",
  "opened": "16 March, 2023",
  "closes": "16 May, 2023",
  "salary": "$25"
}, {
  "position": "Indigenous Initiatives Librarian",
  "url": "https://partnershipjobs.ca/jobs/30990",
  "organization": "University of Victoria Libraries",
  "location": "VICTORIA, BC",
  "opened": "22 March, 2023",
  "closes": "4 May, 2023",
  "salary": "$100,000"
}, {
  "position": "Archivist  Rare Books & Special Collections",
  "url": "https://partnershipjobs.ca/jobs/30970",
  "organization": "McGill University",
  "location": "Montréal, QC",
  "opened": "15 March, 2023",
  "closes": "17 April, 2023",
  "salary": "N/A"
}, {
  "position": "Team Coordinator / Coordonnateur(trice) d'équipe",
  "url": "https://partnershipjobs.ca/jobs/30980",
  "organization": "National Research Council Canada",
  "location": "Ottawa, ON",
  "opened": "17 March, 2023",
  "closes": "24 April, 2023",
  "salary": "$88,379"
}, {
  "position": "Liaison Librarian  Rare Books & Special Collections",
  "url": "https://partnershipjobs.ca/jobs/30969",
  "organization": "McGill University",
  "location": "Montréal, QC",
  "opened": "13 March, 2023",
  "closes": "17 April, 2023",
  "salary": "N/A"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Executive Director - Public Library InterLINK",
  "url": "https://partnershipjobs.ca/jobs/30904",
  "organization": "Public Library InterLINK",
  "location": "Burnaby, BC",
  "opened": "24 February, 2023",
  "closes": "25 April, 2023",
  "salary": "$131,000"
}, {
  "position": "Directrice et bibliothécaire en chef ou directeur et bibliothécaire en chef",
  "url": "https://partnershipjobs.ca/jobs/30873",
  "organization": "Universite Concordia",
  "location": "Montreal, QC",
  "opened": "15 February, 2023",
  "closes": "16 May, 2023",
  "salary": "$245,426"
}, {
  "position": "Librarian",
  "url": "https://partnershipjobs.ca/jobs/30958",
  "organization": "Vancouver Premier College",
  "location": "Richmond, BC",
  "opened": "8 March, 2023",
  "closes": "6 June, 2023",
  "salary": "$44200.00"
}, {
  "position": "Associate Chief Librarian, Data Services, Digital Scholarship and Information Technologies",
  "url": "https://partnershipjobs.ca/jobs/30961",
  "organization": "University of Toronto",
  "location": "Toronto, ON",
  "opened": "10 March, 2023",
  "closes": "8 June, 2023",
  "salary": "$95,411"
}, {
  "position": "Director and Associate Librarian, Collections",
  "url": "https://partnershipjobs.ca/jobs/30895",
  "organization": "University of Calgary",
  "location": "Calgary, AB",
  "opened": "22 February, 2023",
  "closes": "23 May, 2023",
  "salary": "$90,000"
}, {
  "position": "Director, Gerstein Science Information Centre",
  "url": "https://partnershipjobs.ca/jobs/30907",
  "organization": "University of Toronto Libraries",
  "location": "Toronto, ON",
  "opened": "27 February, 2023",
  "closes": "28 May, 2023",
  "salary": "$94,466"
}, {
  "position": "Bibliothécaire responsable du développement des compétences informationnelles - Poste à terme d’un an",
  "url": "https://partnershipjobs.ca/jobs/30956",
  "organization": "Bibliothèque Alfred-Monnin, Université de Saint-Boniface",
  "location": "Winnipeg, MB",
  "opened": "8 March, 2023",
  "closes": "28 April, 2023",
  "salary": "N/A"
}, {
  "position": "Local Library Assistant, Prince Rupert, BC",
  "url": "https://partnershipjobs.ca/jobs/30879",
  "organization": "Courthouse Library BC",
  "location": "Prince Rupert, BC",
  "opened": "15 February, 2023",
  "closes": "16 May, 2023",
  "salary": "N/A"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Digital Engagement Librarian",
  "url": "https://partnershipjobs.ca/jobs/30942",
  "organization": "York University",
  "location": "Toronto, ON",
  "opened": "6 March, 2023",
  "closes": "4 June, 2023",
  "salary": "$85,000"
}, {
  "position": "COPPUL Indigenous Knowledge Coordinator - Part-time",
  "url": "https://partnershipjobs.ca/jobs/30890",
  "organization": "Council of Prairie and Pacific University Libraries",
  "location": "anywhere in Canada, BC",
  "opened": "19 February, 2023",
  "closes": "30 April, 2023",
  "salary": "N/A"
}, {
  "position": "Assistant Director",
  "url": "https://partnershipjobs.ca/jobs/30840",
  "organization": "Lloydminster Public Library",
  "location": "Lloydminster, AB",
  "opened": "6 February, 2023",
  "closes": "7 May, 2023",
  "salary": "$70"
}, {
  "position": "Co-ordinator, Collections and Technical Services",
  "url": "https://partnershipjobs.ca/jobs/30800",
  "organization": "George Brown College",
  "location": "Toronto, ON",
  "opened": "27 January, 2023",
  "closes": "27 April, 2023",
  "salary": "$61523.00"
}, {
  "position": "Office Administrator",
  "url": "https://partnershipjobs.ca/jobs/30841",
  "organization": "Lloydminster Public Library",
  "location": "Lloydminster, AB",
  "opened": "6 February, 2023",
  "closes": "7 May, 2023",
  "salary": "$20"
}, {
  "position": "Public Services Librarian / Bibliothécaire des services publics",
  "url": "https://partnershipjobs.ca/jobs/30843",
  "organization": "Chaleur Library Regional Office - New Brunswick Public LIbrary Service",
  "location": "Campbellton, NB",
  "opened": "7 February, 2023",
  "closes": "8 May, 2023",
  "salary": "$53,456"
}, {
  "position": "Director, Systems Integration, Resource Management & IT",
  "url": "https://partnershipjobs.ca/jobs/30787",
  "organization": "PFM Executive Search",
  "location": "Victoria, BC",
  "opened": "24 January, 2023",
  "closes": "24 April, 2023",
  "salary": "$121,166"
}, {
  "position": "Librarian 1 (Adult Services) 2 Regular Full-Time Positions - Lynn Valley & Parkgate Libraries - (JP#23-06L)",
  "url": "https://partnershipjobs.ca/jobs/30870",
  "organization": "North Vancouver District Public Library",
  "location": "North Vancouver, BC",
  "opened": "15 February, 2023",
  "closes": "16 May, 2023",
  "salary": "$59432.00"
}, {
  "position": "Content Marketing Manager",
  "url": "https://partnershipjobs.ca/jobs/30854",
  "organization": "BiblioCommons Corp.",
  "location": "Toronto, ON",
  "opened": "13 February, 2023",
  "closes": "14 May, 2023",
  "salary": "$80,000"
}, {
  "position": "Assistant University Librarian",
  "url": "https://partnershipjobs.ca/jobs/30846",
  "organization": "OCAD",
  "location": "Toronto, ON",
  "opened": "7 February, 2023",
  "closes": "5 May, 2023",
  "salary": "$94,867"
}, {
  "position": "Director of Research Services",
  "url": "https://partnershipjobs.ca/jobs/30823",
  "organization": "University of California Riverside",
  "location": "Riverside, CA",
  "opened": "2 February, 2023",
  "closes": "3 May, 2023",
  "salary": "$77,150"
}, {
  "position": "Library Technician",
  "url": "https://partnershipjobs.ca/jobs/30778",
  "organization": "Alexander College",
  "location": "Burnaby, BC",
  "opened": "20 January, 2023",
  "closes": "20 April, 2023",
  "salary": "N/A"
}, {
  "position": "",
  "url": "https://partnershipjobs.caundefined",
  "organization": "",
  "location": "",
  "opened": "",
  "closes": "",
  "salary": "N/A"
}, {
  "position": "Discovery Systems Librarian – Library Technology Services",
  "url": "https://partnershipjobs.ca/jobs/30512",
  "organization": "Carleton University",
  "location": "Ottawa, ON",
  "opened": "8 February, 2023",
  "closes": "9 May, 2023",
  "salary": "$73,599"
}, {
  "position": "Director, Branch Services",
  "url": "https://partnershipjobs.ca/jobs/30771",
  "organization": "Edmonton Public Library",
  "location": "Edmonton , AB",
  "opened": "17 January, 2023",
  "closes": "17 April, 2023",
  "salary": "$122,544"
}];
},{}],"../../scoop/persist/nodejs/bin/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61109" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../scoop/persist/nodejs/bin/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jobs.json"], null)
//# sourceMappingURL=/jobs.js.map