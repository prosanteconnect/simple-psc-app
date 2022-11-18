package fr.ans.psc.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SimpleFormController {

    @GetMapping("/form")
    public String getSimpleFormPage() {
        return "form-page";
    }
}
