import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Content from "./Content.js";
import fetch from "node-fetch";
import 'whatwg-fetch';
import Autocomplete from "./Autocomplete.js";
import AutocompleteC1 from "./AutocompleteC1";
import AutocompleteC2 from "./AutocompleteC2";
import AutocompleteC3 from "./AutocompleteC3";
import AutocompleteC4 from "./AutocompleteC4";


const utsmajors = ["Aboriginal Studies and Languages Literacy and Numeracy",
    "Aboriginal Studies and Languages Literacy and Numeracy",
    "Accounting",
    "Acute Care",
    "Adult Education",
    "Advanced Materials and Data Science",
    "Advertising and Marketing Communications",
    "Animation Design",
    "Applied Linguistics",
    "Applied Physics",
    "Applied Physics",
    "Applied Physics",
    "Argentina",
    "Argentina",
    "Artificial Intelligence and Data Analytics",
    "Biology",
    "Biology",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering",
    "Biomedical Engineering (Honours)",
    "Biomedical Science",
    "Biomedical Science",
    "Biomedical Science",
    "Biomedical Science",
    "Biotechnology",
    "Biotechnology",
    "Biotechnology",
    "Biotechnology",
    "Branding Design",
    "Business Information Systems",
    "Business Information Systems",
    "Business Information Systems Management",
    "Business Law",
    "Business Law",
    "Business Modelling",
    "Business Studies",
    "Canada",
    "Canada (Quebec)",
    "Chemistry",
    "Chemistry",
    "Chemistry",
    "Chemistry",
    "Chemistry",
    "Chile",
    "Chile",
    "China",
    "China",
    "Chronic and Complex Care",
    "Chronic and Complex Cares Aging and Palliation",
    "Civil and Environmental Engineering",
    "Civil and Geotechnical Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering and Structural Engineering",
    "Clinical",
    "Clinical Leadership",
    "Clinical Management",
    "Colombia",
    "Colombia",
    "Commerces Business Studies and Economics",
    "Commerces Business Studies and Economics/Computing Studies",
    "Commercial Law",
    "Commercial Law",
    "Commercial Law",
    "Communication",
    "Computational Mathematics",
    "Computer Control Engineering",
    "Computer Control Engineering",
    "Computer Control Engineering",
    "Computer Control Engineering",
    "Computer Control Engineering",
    "Computing Studies",
    "Consumer Analytics",
    "Corporate and Commercial Law",
    "Corporate and Commercial Law",
    "Costa Rica",
    "Costa Rica",
    "Creative Writing",
    "Creative Writing",
    "Crime Scene Investigation",
    "Crime Scene Investigation",
    "Cultural Studies",
    "Cyber Security",
    "Cyber Security",
    "Cyber Security Engineering",
    "Cyber Security Engineering",
    "Cyber Security Engineering",
    "Cybersecurity and Privacy",
    "Data Analytics",
    "Data Analytics",
    "Data Analytics",
    "Data Analytics",
    "Data Engineering",
    "Data Engineering",
    "Data Engineering",
    "Data Engineering",
    "Design for Change",
    "Design for Change Studio",
    "Design Specialisation",
    "Digital and Social Media",
    "Digital and Social Media",
    "Digital Creative Enterprise",
    "Digital Forensics",
    "Digital Forensics",
    "Digital Health and Analytics",
    "Digitally Mediated Environments",
    "Dispute Resolution",
    "Dispute Resolution",
    "Dispute Resolution Law",
    "e-Learning",
    "Economics",
    "Education",
    "Electrical and Electronic Engineering",
    "Electrical Energy Systems",
    "Electrical Energy Systems",
    "Electrical Energy Systems",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electronic Engineering",
    "Electronic Engineering",
    "Electronic Engineering",
    "Electronic Engineering",
    "Energy Planning and Policy",
    "Energy Planning and Policy",
    "Energy Planning and Policy",
    "Energy Planning and Policy",
    "Energy Planning and Policy",
    "English",
    "English",
    "English/History",
    "English/History",
    "Enterprise Systems Development",
    "Enterprise Systems Development",
    "Environmental Biology",
    "Environmental Biotechnology",
    "Environmental Biotechnology",
    "Environmental Engineering",
    "Environmental Engineering",
    "Environmental Engineering",
    "Environmental Science",
    "Environmental Sciences",
    "Events",
    "Exercise Science",
    "Exercise Therapy",
    "Experimental Visual Communications Studio",
    "Extended Economics",
    "Extended Finance",
    "Extended Management",
    "Extended Marketing",
    "Family Law",
    "Family Law",
    "Fashion and Textile Studio",
    "Finance",
    "Finance",
    "Finance",
    "Finance",
    "Financial Analysis",
    "Financial Mathematics",
    "France",
    "France",
    "Geography/Commerces Business Studies and Economics",
    "Geotechnical Engineering",
    "Geotechnical Engineering",
    "Geotechnical Engineering",
    "Geotechnical Engineering",
    "Geotechnical Engineering",
    "Germany",
    "Germany",
    "Global Business Law",
    "Global Business Law",
    "Global Health",
    "Global Health",
    "Health and Physical Education",
    "Health Information Coding",
    "Health Information Management",
    "Health Laws Ethics and Governance",
    "Health Research",
    "Health Research",
    "Health Research",
    "Health Studies",
    "History/Geography",
    "Human Resource Development",
    "Human Resource Development",
    "Human Resource Management",
    "Human Resource Management",
    "Human Resources and Management",
    "Human Society and its Environment",
    "Human Structure and Function",
    "Immersive Media Studio",
    "Indigenous Studies",
    "Industrial and Intellectual Property Law",
    "Industrial and Intellectual Property Law",
    "Information and Media",
    "Information Design",
    "Information Technology",
    "Information Technology",
    "Information Technology Law",
    "Information Technology Law",
    "Integrated Communication",
    "Integrated Logistic Support and Engineering Management",
    "Integrated Logistic Support and Engineering Management",
    "Intellectual Property",
    "Intellectual Property",
    "Interaction",
    "Interaction Design",
    "Interactivation Studio",
    "Interactive Media",
    "Interactive Media",
    "International Business",
    "International Business",
    "International Business",
    "International Law",
    "International Law",
    "International Law",
    "International Trade Law",
    "International Trade Law",
    "International Trade Law",
    "Internetworking",
    "Internetworking",
    "Italy",
    "Italy",
    "Japan",
    "Japan",
    "Journalism",
    "Journalism",
    "K-12",
    "K-12",
    "Languages Literacy and Numeracy",
    "Languages",
    "Languages other than English",
    "Latin Americas",
    "Latin(o) USA",
    "Latino USA",
    "Legal Futures and Technology",
    "Legal Futures and Technology",
    "Legal Studies",
    "Lighting Studio",
    "Local Government",
    "Management",
    "Management",
    "Management",
    "Management",
    "Management",
    "Management Studies",
    "Manufacturing Engineering and Management",
    "Manufacturing Engineering and Management",
    "Manufacturing Engineering and Management",
    "Manufacturing Engineering and Management",
    "Manufacturing Engineering and Management",
    "Marine Biology",
    "Marine Science and Management",
    "Marine Sciences and Management (Honours)",
    "Marketing",
    "Marketing",
    "Mathematical Analysis",
    "Mathematical and Statistical Modelling",
    "Mathematical and Statistical Modelling (Honours)",
    "Mathematics",
    "Mathematics",
    "Mathematics",
    "Mathematics",
    "Mathematics",
    "Mathematics/Business Studies/Economics",
    "Mathematics/Computing Studies",
    "Mathematics/Science",
    "Mechanical and Mechatronic Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechatronic Engineering",
    "Mechatronic Engineering",
    "Mechatronic Engineering",
    "Mechatronic Engineering",
    "Media Arts and Production",
    "Media Arts and Production",
    "Medical Biotechnology",
    "Medical Science",
    "Medical Science",
    "Medical Science",
    "Mexico",
    "Mexico",
    "Music and Sound Design",
    "Nanotechnology",
    "Nanotechnology",
    "Nanotechnology",
    "Narrative Media Studio",
    "Networking and Cybersecurity",
    "Nurse Practitioner",
    "Objects and Accessories Studio",
    "Operations",
    "Operations",
    "Operations",
    "Operations",
    "Operations",
    "Operations Analysis",
    "Operations and Supply Chain",
    "Operations and Supply Chain Management",
    "Operations Research",
    "Organisational and Workplace Learning",
    "PDHPE/Mathematics",
    "PDHPE/Science",
    "Personal Developments Health and Physical Education",
    "Personal Developments Health and Physical Education",
    "Pharmaceutical Sciences",
    "Pharmacology",
    "Photomedia",
    "Planning",
    "Planning",
    "Popular Education and Social Change",
    "Pre-medicine",
    "Primary",
    "Primary",
    "Primary",
    "Primary",
    "Primary",
    "Primary (Honours) Major",
    "Primary A",
    "Primary A",
    "Primary Education",
    "Primary Health Care",
    "Professional Accounting",
    "Project Management",
    "Project Management",
    "Public Communication",
    "Public Communication",
    "Public Relations",
    "Quality & Safety",
    "Quality & Safety Major",
    "Quantum Information Science major",
    "Risk Management",
    "Robotics",
    "Robotics major",
    "Robotics major",
    "Safety and Quality in Health Care",
    "Science",
    "Science",
    "Science/Computing Studies",
    "Science/Mathematics",
    "Secondary",
    "Secondary",
    "Secondary",
    "Secondary",
    "Secondary (Honours) major",
    "Secondary A",
    "Secondary A",
    "Secondary Education",
    "Secondary Education (PG)",
    "Secondary Education (UG)",
    "Service Innovation and Change",
    "Sexuals Reproductives Maternal and Newborn Child Health Major",
    "Social and Political Sciences",
    "Social Inquiry",
    "Software Development",
    "Software Development",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Systems Engineering",
    "Software Systems Engineering",
    "Sound and Music Design",
    "Spain",
    "Spain",
    "Sport Business",
    "Sport Management",
    "Statistics",
    "Statistics",
    "Structural Engineering",
    "Structural Engineering",
    "Structural Engineering",
    "Structural Engineering",
    "Structural Engineering",
    "Switzerland",
    "Switzerland",
    "Systems Engineering",
    "Systems Engineering",
    "Systems Engineering",
    "Technology Management",
    "Telecommunication Networks",
    "Telecommunication Networks",
    "Telecommunications and Electronics",
    "Telecommunications and Electronics",
    "Telecommunications Engineering",
    "Telecommunications Engineering",
    "Telecommunications Engineering and Telecommunication Networks",
    "Telecommunications Engineering and Telecommunication Networks",
    "TESOL",
    "Tourism",
    "Tourism Management",
    "Value Chain Management",
    "Visual Arts",
    "Visual Arts",
    "Vocational Education",
    "Water Engineering",
    "Water Engineering",
    "Water Engineering",
    "Water Engineering",
    "Water Engineering",
    "Writing and Cultural Studies"];
const unswmajors = ["ACCT: Accounting",
    "ACTL: Actuarial Studies",
    "ADAD: Art and Design",
    "AERO: Aerospace Engineering",
    "ANAT: Anatomy",
    "ARCH: Architecture",
    "ARTS: Disciplinary and Interdisciplinary Humanities",
    "ATSI: Nura Gili (Indigenous Programs)",
    "AVEN: Aviation",
    "AVIA: Aviation",
    "AVIF: Aviation",
    "AVIG: Aviation",
    "BABS: Biotechnology & Biomolecular Sciences",
    "BEES: Biological Earth & Environmental Science",
    "BEIL: BE Interdisciplinary Learning",
    "BENV: Built Environment",
    "BINF: Bioinformatics",
    "BIOC: Biochemistry",
    "BIOM: Biomedical Engineering",
    "BIOS: Biological Science",
    "BIOT: Biotechnology",
    "BLDG: Building",
    "CDEV: Career Development",
    "CEIC: Chemical Engineering and Industrial Chemistry",
    "CHEM: Chemistry",
    "CHEN: Chemical Engineering",
    "CLIM: Climate Science",
    "CODE: Computational Design",
    "COMD: Development Studies",
    "COMM: Commerce",
    "COMP: Computer Science",
    "CONS: Construction Management",
    "CRIM: Criminology",
    "CRTV: Creative practice",
    "CVEN: Civil and Environmental Engineering",
    "DATA: Data Science",
    "DESN: Design Next",
    "DPBS: Global Diploma - Business",
    "DPGE: Global Diploma - General Education",
    "DPST: Global Diploma - STEM",
    "ECON: Economics",
    "EDST: Education Studies",
    "ELEC: Electrical Engineering",
    "ENGG: Engineering interdisciplinary",
    "ENVS: Environmental Studies",
    "FINS: Finance",
    "FOOD: Food Technology",
    "GBAT: Business Technology",
    "GENC: UNSW Business School",
    "GENE: General Education - Faculty of Engineering",
    "GENL: General Education - Faculty of Law",
    "GENM: General Education - Faculty of Medicine",
    "GENS: General Education - Faculty of Science",
    "GENY: General Education - The Learning Centre",
    "GEOL: Geology",
    "GEOS: Geoscience",
    "GMAT: Surveying & Spatial Information Systems",
    "GSBE: Architecture",
    "GSOE: Engineering",
    "HDAT: Health Data Science",
    "HESC: Health and Exercise Science",
    "HUML: Humanities and Languages",
    "HUMS: Humanities",
    "IDES: Industrial Design",
    "IEST: Institute of Environmental Studies",
    "INDC: Industrial Chemistry",
    "INFS: Information Systems",
    "INOV: Innovation",
    "INST: International Studies",
    "INTA: Interior Architecture",
    "JURD: Juris Doctor",
    "LAND: Landscape Architecture",
    "LAWS: Law",
    "LING: Linguistics",
    "MANF: Manufacturing Engineering",
    "MARK: Marketing",
    "MATH: Mathematics",
    "MATS: Materials Science and Engineering",
    "MBAX: Management",
    "MDCN: Medicine",
    "MDIA: Media",
    "MECH: Mechanical Engineering",
    "MFAC: Medicine",
    "MFIN: Finance",
    "MGMT: Management",
    "MICR: Microbiology",
    "MINE: Mining Engineering",
    "MMAN: Mechanical & Manufacturing Engineering",
    "MNGT: Management",
    "MNNG: Mining",
    "MODL: Modern Language Studies",
    "MSCI: Marine Science",
    "MTRN: Mechatronic Engineering",
    "MUPS: Urban Policy and Strategy",
    "MUSC: Music",
    "NANO: Nanotechnology",
    "NAVL: Naval Architecture",
    "NCHR: HIV Social Research",
    "NEUR: Neuroscience",
    "OPTM: Optometry",
    "PATH: Pathology",
    "PHAR: Pharmacology",
    "PHCM: Public Health and Community Medicine",
    "PHOP: Public Health Offshore Program",
    "PHSL: Physiology",
    "PHTN: Photonics",
    "PHYS: Physics",
    "PLAN: Planning and Urban Development",
    "POLS: Political Science",
    "POLY: Polymer Science",
    "PSCY: Psychiatry",
    "PSYC: Psychology",
    "PTRL: Petroleum Engineering",
    "REGZ: Registrar's Division",
    "REST: Real Estate",
    "RISK: Risk Management",
    "SAHT: Art History",
    "SART: Art",
    "SCIF: Faculty of Science",
    "SDES: Design Studies",
    "SENG: Software Engineering",
    "SERV: Services Marketing - Tourism and Hospitality",
    "SLSP: Social Science and Policy",
    "SOCF: Social Work",
    "SOCW: Social Work",
    "SOLA: Photovoltaics and Solar Energy",
    "SOMA: Media Arts",
    "SOMS: Medical Science",
    "SOSS: Social Sciences",
    "SPRC: Social Policy",
    "SRAP: Social Research and Policy",
    "STAM: Arts and Media",
    "SUSD: Sustainable Development",
    "SWCH: Women & Children's Health",
    "TABL: Taxation and Business Law",
    "TELE: Telecommunications",
    "UDES: Urban Development Studies",
    "VISN: Vision Science",
    "YCAN: Engineering & Information Technology",
    "YMED: Arizona State University Medicine",
    "ZBUS: Business",
    "ZEIT: Information Technology & Electrical Engineering",
    "ZGEN: University College General Education",
    "ZHSS: Humanities & Social Sciences",
    "ZINT: University College (Interdisciplinary)",
    "ZPEM: Physical Environmental & Mathematical Sciences"];
const usydmajors = ["Accounting",
    "American Studies",
    "Anatomy and Histology (for Medical Science)",
    "Anatomy and Histology",
    "Anatomy and Histology",
    "Ancient Greek",
    "Ancient History",
    "Animal and Veterinary Bioscience",
    "Animal Health Disease and Welfare (for Medical Science)",
    "Animal Health Disease and Welfare",
    "Animal Production",
    "Anthropology",
    "Asian Studies",
    "Applied Medical Science",
    "Applied Medical Science",
    "Arabic Language and Cultures (Intermediate)",
    "Arabic Language and Cultures (Advanced)",
    "Applied Medical Science (for Medical Science)",
    "Arabic Language and Cultures (Introductory)",
    "Art History",
    "Banking (non Commerce)",
    "Behavioural Sciences",
    "Banking",
    "Archaeology",
    "Brass",
    "Biology",
    "Built Environment",
    "Bioinformatics",
    "Business Analytics (non Commerce)",
    "Biochemistry and Molecular Biology",
    "Biochemistry",
    "Biochemistry and Molecular Biology (for Medical Science)",
    "Business Analytics",
    "Biology",
    "Biological Design",
    "Biblical Studies and Classical Hebrew",
    "Business Information Systems",
    "Chinese Studies (Introductory)",
    "Business Law",
    "Chinese Studies (Advanced)",
    "Composition",
    "Cell and Developmental Biology",
    "Business Information Systems",
    "Chemical Engineering",
    "Chemistry",
    "Chemistry",
    "Cell Pathology",
    "Chinese Studies (Intermediate)",
    "Computer Science",
    "Cultural Studies",
    "Computer Engineering",
    "Criminology",
    "Construction Management",
    "Computational Data Science",
    "Computer Science",
    "Construction",
    "Contemporary Music Practice",
    "Data Science",
    "Computational Engineering",
    "Computer Science",
    "Economics",
    "Economic Policy",
    "Energy and the Environment",
    "Disability and Participation",
    "Digital Cultures",
    "Ecology and Evolutionary Biology",
    "Econometrics",
    "Economic Policy",
    "Design",
    "Education",
    "Economics",
    "Electrical Engineering",
    "Finance",
    "Environmental Studies",
    "English",
    "Exercise Science",
    "Film Studies",
    "Finance (non Commerce)",
    "Environmental Studies",
    "European Studies",
    "Environmental Science",
    "Environmental Agricultural and Resource Economics",
    "Environmental Engineering",
    "Engineering Design",
    "Food Science (for Medical Science)",
    "Gender Studies",
    "Financial Mathematics and Statistics",
    "French and Francophone Studies (Introductory)",
    "Food and Bioprocessing",
    "Food Science",
    "Financial Economics",
    "French and Francophone Studies (Advanced)",
    "Financial Economics",
    "French and Francophone Studies (Intermediate)",
    "Financial Mathematics and Statistics",
    "Fluids Engineering",
    "Genetics and Genomics (for Animal and Veterinary Bioscience)",
    "Global Studies",
    "Genetics and Genomics (for Medical Science)",
    "Genetics and Genomics",
    "Geotechnical Engineering",
    "Geography",
    "Germanic Studies (Introductory)",
    "Germanic Studies (Intermediate)",
    "Geography",
    "Germanic Studies (Advanced)",
    "Geology and Geophysics",
    "Geology and Geophysics",
    "Human Movement",
    "History and Philosophy of Science",
    "Historical Performance",
    "Health Sciences",
    "History",
    "Hebrew (Modern) (Advanced)",
    "Humanitarian Engineering",
    "Health",
    "Hearing and Speech",
    "Hebrew (Modern) (Intermediate)",
    "History and Philosophy of Science",
    "Hebrew (Modern) (Introductory)",
    "Industrial Relations and Human Resource Management",
    "Infectious Diseases",
    "Indigenous Studies",
    "Indonesian Studies (Intermediate)",
    "Immunobiology",
    "Information Systems",
    "Immunology and Pathology (for Medical Science)",
    "Immunology and Pathology",
    "Infectious Diseases (for Medical Science)",
    "Industrial Pharmacy",
    "Indonesian Studies (Introductory)",
    "Indonesian Studies (Advanced)",
    "Information Technology (Engineering)",
    "Italian Studies (Intermediate)",
    "Information Systems",
    "Intelligent Information Engineering",
    "International Relations",
    "Information Systems",
    "International Relations",
    "Internet of Things",
    "International Business",
    "International Pharmacy",
    "International and Comparative Literary Studies",
    "Italian Studies (Advanced)",
    "Japanese Studies (Advanced)",
    "Japanese Studies",
    "Jewish Civilisation Thought and Culture",
    "Korean Studies (Intermediate)",
    "Japanese Studies (Introductory)",
    "Korean Studies (Advanced)",
    "Japanese Studies (Junior Intermediate)",
    "Korean Studies (Heritage Speaker)",
    "Italian Studies (Introductory)",
    "Italian Studies",
    "Jazz Performance",
    "Japanese Studies (Senior Intermediate)",
    "Korean Studies",
    "Latin",
    "Korean Studies (Introductory)",
    "Mathematics",
    "Mechanical Engineering",
    "Management",
    "Materials Science and Engineering",
    "Marine Science",
    "Mathematics",
    "Linguistics",
    "Marketing",
    "Marine Science",
    "Media Studies",
    "Medicinal Chemistry",
    "Modern Greek Studies (Intermediate)",
    "Microbiology (for Medical Science)",
    "Microbiology",
    "Mechatronic Engineering",
    "Microbiology",
    "Medicinal Chemistry (for Medical Science)",
    "Medical Science",
    "Modern Greek Studies (Advanced)",
    "Medicinal Chemistry",
    "Modern Greek Studies (Introductory)",
    "Natural Terrestrial Systems",
    "Neuroscience (for Medical Science)",
    "Music",
    "Molecular Biology and Genetics",
    "Neuroscience",
    "Modern Greek Studies",
    "Neuroscience",
    "Musicology",
    "Modern Greek Studies",
    "Non-orchestral Instrument Performance",
    "Musicology",
    "Music",
    "Percussion",
    "Nutrition Science",
    "Physics",
    "Philosophy",
    "Pharmacology",
    "Pharmacology",
    "Physics",
    "Nutrition and Metabolism",
    "Orchestral Instrument Performance",
    "Nutrition Science (for Medical Science)",
    "Physical Activity and Health",
    "Pharmacology (for Medical Science)",
    "Physiology (for Medical Science)",
    "Power Engineering",
    "Plant Science",
    "Political Economy",
    "Politics",
    "Politics",
    "Physiology",
    "Plant Production",
    "Piano",
    "Physiology",
    "Process Intensification",
    "Project Management",
    "Robotics and Intelligent Systems",
    "Soil Science and Hydrology",
    "Software Development",
    "Quantitative Life Sciences",
    "Socio-Legal Studies",
    "Space Engineering",
    "Soil Science",
    "Psychology",
    "Psychological Science",
    "Spanish and Latin American Studies (Advanced)",
    "Software Development",
    "Sociology",
    "Statistics",
    "Spanish and Latin American Studies (Introductory)",
    "Spanish and Latin American Studies (Intermediate)",
    "Visual Arts",
    "Structures",
    "Strings",
    "Voice (classical) Performance",
    "Theatre and Performance Studies",
    "Transport Engineering",
    "Telecommunications Engineering",
    "Studies in Religion",
    "Statistics",
    "Wildlife Conservation",
    "Water and Environmental Treatment Process",
    "Woodwind",
    "Voice"];


const axios = require('axios');

var majorforsearch = [];
var courselist = [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentname: '',
            phonenumber: '',
            searchname: '',
            majorname: '',
            uniname: 'usyd',
            course1: '',
            course2: '',
            course3: '',
            course4: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.axiosPostData = this.axiosPostData.bind(this);
        this.fetchGetData = this.fetchGetData.bind(this);
        //this.fetchUni = this.fetchUni.bind(this);

        //maybe can be used if  uniname initialized at the first stage
        if (this.state.uniname === "uts") majorforsearch = utsmajors
        else if (this.state.uniname === "usyd") majorforsearch = usydmajors
        else if (this.state.uniname === "unsw") majorforsearch = unswmajors
        else console.log("input error");

    }

/*
    componentDidMount() {
        this.fetchUni();
    }*/
/*
    fetchUni = async event=>{
        console.log("still at frontkend");
        const text = event.target.uniname.value;
        const response = await fetch(`http://localhost:5000/api/uni/${text}`);
        const returned = await response.json();
        console.log("still at fkend");
        console.log(returned.toString());
        const uniname2 = returned;
        this.setState(this.state.uniname = uniname2);

        if (this.state.uniname === "uts") {
            majorforsearch = utsmajors;
        } else if (this.state.uniname === "usyd") {
            majorforsearch = usydmajors;
        } else if (this.state.uniname === "unsw") {
            majorforsearch = unswmajors;
        } else {
            console.log("input error");
        }
    }
    */
    //Used to find specific value according to users' input
    fetchGetData = async event => {

        event.preventDefault();
        //Also Note that majorname as a selected result that sent from auto complete
        //can not be saved into state of App somehow
        //fetch("/api/uni/" + this.state.uniname)
        //change collection(major) entry
        //------------------------------------
        //process.env directs to localhost:3000 automatically
        //------------------------------------
        //this.fetchUni();
        fetch("http://localhost:5000/api/search/" + event.target.majorname.value)
            .then(res => res.json())
            .then(
                (res) => {
                    //element can be obatined through res[0].elementname
                    //since res is represented as array there
                    if (res.length === 0) {
                        alert("Please check your words' spelling, upper or lower case"+
                            "\n\n if the issue persists, ignore this" +
                            "\nand manually input your info please");

                    } else {
                        console.log("course array length is" + res.length);

                    }
                    for (var i = 0; i < res.length; i++) {
                        //dont wanna alert jump out too many times :D
                        //show courses
                        //alert(res[i].course);// but this can be used for testing ~
                        //normally there should be only 1 array returned that has multiple elements inside
                        //console.log("courses are:" + res[i].course);
                        //courselist = res[i].course;
                        courselist = courselist.concat(res[i].course);
                        console.log(courselist + "course list is ~~~");
                        if(i+1 == res.length) alert("courses has been loaded~"+"enjoy with auto-completion helper feature~");

                    }

                },
                // Note: it's important to handle errors here
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        this.setState({majorname : event.target.majorname.value});
        //console.log("major name actually !!!!"+this.state.majorname);
        //console.log("uni name actually!!!"+this.state.uniname);
    };


    axiosPostData = (event) => {
        //  event.preventDefault(); is used to prevent frontend real actions
        //  (in this case :to refresh itself automatically when changes are made)
        event.preventDefault();
        axios.post('http://localhost:5000/api/submitinfo', {
            studentname: this.state.studentname,
            phonenumber: this.state.phonenumber,
            uniname: this.state.uniname,
            majorname: this.state.majorname,
            course1: event.target.course1.value,
            course2: event.target.course2.value,
            course3: event.target.course3.value,
            course4: event.target.course4.value,

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        //alert('A name was submitted: ' + this.state.studentname + '  phone number is' + this.state.phonenumber);
    }

    handleChange(event) {
        //prevent may not needed?
        //event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let header = '';

        return (
            <div className="App">
                <form onSubmit={this.fetchGetData}>
                    <label>university name :</label>
                    <br></br>
                    <input
                        type='text'
                        name='uniname'
                        size = '35'
                        value={this.state.uniname}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label>major name :</label>
                    <br></br>
                    <Autocomplete
                        menuLimit={10}
                        suggestions={majorforsearch}
                        value = {this.state.majorname}
                        onChange = {this.handleChange}
                    />
                    <br></br>
                    <input type="submit" className="button" value="Load"/>

                </form>

                <form onSubmit={this.axiosPostData}>
                    <label>student name:</label>
                    <br></br>
                    <input
                        type='text'
                        name='studentname'
                        size = '35'
                        value={this.state.studentname}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label>phone number:</label>
                    <br></br>
                    <input
                        type='text'
                        name='phonenumber'
                        size = '35'
                        value={this.state.phonenumber}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label>my courses:</label>
                    <br></br>
                    <AutocompleteC1
                        menuLimit={10}
                        suggestions={courselist}
                        value = {this.state.course1}
                        onChange = {this.handleChange}
                    />
                    <br></br>

                    <AutocompleteC2
                        menuLimit={10}
                        suggestions={courselist}
                        value = {this.state.course2}
                        onChange = {this.handleChange}
                    />
                    <br></br>

                    <AutocompleteC3
                        menuLimit={10}
                        suggestions={courselist}
                        value = {this.state.course3}
                        onChange = {this.handleChange}
                    />
                    <br></br>

                    <AutocompleteC4
                        menuLimit={10}
                        suggestions={courselist}
                        value = {this.state.course4}
                        onChange = {this.handleChange}
                    />
                    <br></br>

                    <Popup modal trigger={<input type = "submit" className="button1" value="Submit"></input>}>
                        {close => <Content close={close}/>}
                    </Popup>

                </form>
            </div>
        )
    }

}

export default App