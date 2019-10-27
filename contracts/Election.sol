pragma solidity ^0.5.8;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string fecha;
        string enfermedad;
        string tratamiento;
        string resultados;
    }

    // Store Candidates
    // Fetch Candidates
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;
    // Constructor
    constructor() public {
        addCandidate("Paco", 10, "10-10-10", "periodontitis", "aplicar pasta dental", "curación exitosa");
        addCandidate("Sam", 5, "11-11-11", "válvula cardíaca", "poca actividad", "curación exitosa");
        addCandidate("Foli", 3, "12-12-12", "hipoglucemia", "comida con mayor azúcar", "No se curó, falta mayor tratamiento");
    }

    function addCandidate (string memory _name, uint _edad, string memory _fecha, string memory _enfermedad, string memory _tratamiento, string memory _resultados) private { // An underscore means that the variable is local
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _edad, _fecha, _enfermedad, _tratamiento, _resultados);
    }
}