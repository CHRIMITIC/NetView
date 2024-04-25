package com.example.netview_java.controller;
import com.example.netview_java.model.Login;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @CrossOrigin(origins = "*")
    @PostMapping("/test")
    public String test(@RequestBody String[] requestData) {
        return requestData[0]+requestData[1];
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/api/login")
    public String login(@RequestBody String[] data) {
        Login login=new Login(data[0], data[1]);
        Boolean credentials=false;
        try{
            credentials=login.verifyCredentials();
        }catch(Exception e){
            e.printStackTrace();
        }
        return credentials.toString();
    }
}