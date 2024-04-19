package com.example.netview_java.controller;
import com.example.netview_java.model.Signup;
import org.springframework.web.bind.annotation.*;

@RestController
public class SignupController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/signup")
    public String signup(@RequestParam String username, @RequestParam String password,@RequestParam String nwId,@RequestParam String type) {
        Signup signup=new Signup(username, password, nwId, type);
        Boolean inserted=false;
        try{
            inserted=signup.insertDatabase();
        }catch(Exception e){
            e.printStackTrace();
        }
        return inserted.toString();
    }
}
