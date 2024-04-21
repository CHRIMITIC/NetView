package com.example.netview_java.controller;
import com.example.netview_java.model.Device;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController
public class DevicesController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/devices")
    public ArrayList<String> network(@RequestParam String nwId) {
        Device d=new Device(nwId);
        try {
            ArrayList<String> a=d.getDevices();
            return a;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
