package com.example.netview_java.controller;
import com.example.netview_java.model.Users;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class UsersController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/users")
    public ArrayList<String[]> users(@RequestParam String username, @RequestParam String password,@RequestParam String nwId) {
        Users user=new Users(username,password,nwId);
        try {
            return user.getUsers();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
