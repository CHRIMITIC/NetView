package com.example.netview_java.controller;
import com.example.netview_java.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/changeData")
    public Boolean changeData(@RequestParam String username,@RequestParam String password,@RequestParam String oldUs,@RequestParam String oldPsw) {
        User user=new User(username,password,oldUs,oldPsw);
        try {
            return user.changeData();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
