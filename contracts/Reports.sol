pragma solidity ^0.5.8;

contract Reports {
    // Model a Candidate
    struct Report {
        uint id;
        string name;
        uint age;
        string date;
        string disease;
        string treatment;
        string results;
        bool verified;
    }
    struct Stakeholder {
        uint id;
        address walletAddress;
        uint reportId;
    }

    // Store Candidates
    // Fetch Candidates
    mapping(uint => Report) public reports;
    mapping(uint => Stakeholder) public stakeholders;

    // Store Reports Count
    uint public reportsCount;
    uint public stakeholdersCount;

    // Constructor
    constructor() public {
        addReport("Paco", 10, "10-10-10", "Periodontitis", "Aplicar pasta dental", "Curación exitosa.");
        addReport("Sam", 5, "11-11-11", "Válvula cardíaca", "Poca actividad", "Curación exitosa.");
        addReport("Foli", 3, "12-12-12", "Hipoglucemia", "Comida con mayor azúcar", "No se curó, falta mayor tratamiento.");
    }

    function addReport (
    string memory _name,
    uint _age,
    string memory _date,
    string memory _disease,
    string memory _treatment,
    string memory _results) private {
        reportsCount ++;
        reports[reportsCount] = Report(reportsCount, _name, _age, _date, _disease, _treatment, _results, false);
    }


     function addStakeholder (
    address _walletAddress,
    uint _reportId) public {
        stakeholdersCount ++;
        stakeholders[stakeholdersCount] = Stakeholder(stakeholdersCount, _walletAddress, _reportId);
    }

     function verifyReport (
        uint _reportId
    ) public {
        Report storage pivotReport = reports[_reportId];
        pivotReport.verified = true;
    }

    function verifyReportFinal  (
    address _walletAddress,
    uint _reportId) public {
        stakeholdersCount ++;
        stakeholders[stakeholdersCount] = Stakeholder(stakeholdersCount, _walletAddress, _reportId);
        Report storage pivotReport = reports[_reportId];
        pivotReport.verified = true;
    }

}