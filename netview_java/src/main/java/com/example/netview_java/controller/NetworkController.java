package com.example.netview_java.controller;
import com.example.netview_java.model.Network;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class NetworkController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/network")
    public ArrayList<String> network(@RequestParam String username, @RequestParam String password) {
        Network n=new Network(username,password);
        try {
            return n.getNetwork();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/nwId")
    public int network(){
        Network n=new Network();
        try {
            return n.getNwId();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }
}