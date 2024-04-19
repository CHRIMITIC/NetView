package com.example.netview_java.controller;
import com.example.netview_java.model.Login;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @CrossOrigin(origins = "*")
    @GetMapping("/test")
    public String test() {
        return "working";
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Login login=new Login(username, password);
        Boolean credentials=false;
        try{
            credentials=login.verifyCredentials();
        }catch(Exception e){
            e.printStackTrace();
        }
        return credentials.toString();
    }
}