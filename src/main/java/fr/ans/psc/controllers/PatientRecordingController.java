package fr.ans.psc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/secure/patient")
public class PatientRecordingController {

    @GetMapping()
    public String navigate() {
        return "/new-patient";
    }
}
