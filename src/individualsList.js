// TODO: move this to a better place
const translateDateFromServer = dateStr =>
    (!!dateStr &&
        dateStr.length >= 8 &&
        new Date(
            `${dateStr.substring(0, 4)}-${dateStr.substring(
                4,
                6
            )}-${dateStr.substring(6, 8)}`
        )) ||
    undefined;

const individualList = [
    {
        annotationSets: [],
        id: 12,
        name: "00124-010-COHO_6",
        sex: "FEMALE",
        karyotypicSex: "XX",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Madrid",
            description: ""
        },
        dateOfBirth: "1959",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20161204104557",
            message: ""
        },
        lifeStatus: "UNKNOWN",
        affectationStatus: "AFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0610864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 43,
        name: "013-01532-COHO_7",
        sex: "MALE",
        karyotypicSex: "XY",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Andalucia",
            description: ""
        },
        dateOfBirth: "1987",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "UNKNOWN",
        affectationStatus: "AFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:1010864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 243,
        name: "4213-032-COHO_17",
        sex: "MALE",
        karyotypicSex: "XY",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Valencia",
            description: ""
        },
        dateOfBirth: "1964",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "DECEASED",
        affectationStatus: "UNAFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:3019864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 212,
        name: "2014-086-COHO_3",
        sex: "MALE",
        karyotypicSex: "XY",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Madrid",
            description: ""
        },
        dateOfBirth: "1957",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "UNKNOWN",
        affectationStatus: "AFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0010864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 267,
        name: "0323-011-COHO_6",
        sex: "MALE",
        karyotypicSex: "XY",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Andalucia",
            description: ""
        },
        dateOfBirth: "1988",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "ALIVE",
        affectationStatus: "AFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0010864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 86,
        name: "04283-010-COHO_7",
        sex: "MALE",
        karyotypicSex: "XY",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Valencia",
            description: ""
        },
        dateOfBirth: "1990",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "ALIVE",
        affectationStatus: "UNAFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0016864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 280,
        name: "05356-010-COHO_7",
        sex: "FEMALE",
        karyotypicSex: "XX",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Pais Vasco",
            description: ""
        },
        dateOfBirth: "02-02-1980",
        release: 1,
        version: 1,
        creationDate: "20171204104557",
        status: {
            name: "READY",
            date: "20171204104557",
            message: ""
        },
        lifeStatus: "MISCARRIAGE",
        affectationStatus: "CONTROL",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0070864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    },
    {
        annotationSets: [],
        id: 523,
        name: "0013-010-COHO_7",
        sex: "FEMALE",
        karyotypicSex: "XX",
        ethnicity: "white caucasian",
        species: {
            taxonomyCode: "",
            scientificName: "",
            commonName: ""
        },
        population: {
            name: "Spain",
            subpopulation: "Galicia",
            description: ""
        },
        dateOfBirth: "1946",
        release: 1,
        version: 1,
        creationDate: "20170204104557",
        status: {
            name: "READY",
            date: "20171205104557",
            message: ""
        },
        lifeStatus: "ABORTED",
        affectationStatus: "AFFECTED",
        phenotypes: [
            {
                id: "F72",
                name: "Severe intellectual disabilities",
                source: "ICD10"
            },
            {
                id: "HP:0019864",
                name: "Intellectual disability, severe",
                source: "HPO"
            }
        ]
    }
];

for (const individual of individualList) {
    individual.dateOfBirth = translateDateFromServer(individual.dateOfBirth);
    individual.creationDate = translateDateFromServer(individual.creationDate);
}

export default individualList;
