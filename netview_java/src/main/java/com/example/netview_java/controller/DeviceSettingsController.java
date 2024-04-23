package com.example.netview_java.controller;
import com.example.netview_java.model.DeviceSettings;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class DeviceSettingsController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/ports")
    public ArrayList<String[]> ports(@RequestParam String devName, @RequestParam String nwId) {
        DeviceSettings deviceSettings =new DeviceSettings(devName, nwId);
        try{
            return deviceSettings.getPorts();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
