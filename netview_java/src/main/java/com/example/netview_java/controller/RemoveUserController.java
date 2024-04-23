package com.example.netview_java.controller;
import com.example.netview_java.model.RemoveUser;
import org.springframework.web.bind.annotation.*;

@RestController
public class RemoveUserController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/remove")
    public Boolean signup(@RequestParam String username, @RequestParam String password,@RequestParam String nwId,@RequestParam String type) {
        RemoveUser removeUser =new RemoveUser(username, password, nwId, type);
        Boolean inserted=false;
        try{
            inserted= removeUser.deleteDatabase();
        }catch(Exception e){
            e.printStackTrace();
        }
        return inserted;
    }
}
