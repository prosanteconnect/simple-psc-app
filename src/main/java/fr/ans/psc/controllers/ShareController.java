package fr.ans.psc.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Objects;

@RestController("/secure/share)")
public class ShareController {

    private final RestTemplate restTemplate;

    private final String APPLICATION_JSON = MediaType.APPLICATION_JSON_VALUE;

    @Value("${psc.context.sharing.api.url}")
    private String shareApiBaseUrl;

    public ShareController() {
        this.restTemplate = new RestTemplate();
    }

    @GetMapping(produces = APPLICATION_JSON)
    public ResponseEntity<String> getContextInCache() {
        HttpEntity<String> entity = prepareRequest(null);

        try {
            String response = restTemplate.exchange(URI.create(shareApiBaseUrl), HttpMethod.GET, entity, String.class).getBody();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO : handle differently NOT_FOUND & errors ?
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(produces = APPLICATION_JSON, consumes = APPLICATION_JSON)
    public ResponseEntity<String> putContextInCache(@RequestBody String jsonContext) {
        HttpEntity<String> entity = prepareRequest(jsonContext);

        try {
            String response = restTemplate.exchange(URI.create(shareApiBaseUrl), HttpMethod.POST, entity, String.class).getBody();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO : handle differently NOT_FOUND & errors ?
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private HttpEntity<String> prepareRequest(String requestBody) {
        HttpServletRequest incoming = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, incoming.getHeader(HttpHeaders.AUTHORIZATION));
        headers.add(HttpHeaders.ACCEPT, APPLICATION_JSON);

        if (requestBody != null) {
            headers.add(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON);
            return new HttpEntity<>(requestBody, headers);
        } else {
            return new HttpEntity<>(headers);
        }
    }
}
