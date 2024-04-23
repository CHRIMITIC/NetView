package com.example.netview_java.controller;
import com.example.netview_java.model.AddUser;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddUserController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/add")
    public Boolean signup(@RequestParam String username, @RequestParam String password,@RequestParam String nwId,@RequestParam String type) {
        AddUser addUser =new AddUser(username, password, nwId, type);
        Boolean inserted=false;
        try{
            inserted= addUser.insertDatabase();
        }catch(Exception e){
            e.printStackTrace();
        }
        return inserted;
    }
}
