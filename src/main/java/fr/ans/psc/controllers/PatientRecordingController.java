package fr.ans.psc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/secure/patient/check-in")
public class PatientRecordingController {

    @PostMapping()
    public String recordNewPatient(@RequestParam String patientFirstName,
                                 @RequestParam String patientLastName,
                                 @RequestParam String patientDOB,
                                 @RequestParam String patientINS) {
        return "/index";
    }
}
