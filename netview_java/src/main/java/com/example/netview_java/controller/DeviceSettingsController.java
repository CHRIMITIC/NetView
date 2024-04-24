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
    @CrossOrigin(origins = "*")
    @GetMapping("/api/routes")
    public ArrayList<String> routes(@RequestParam String devName, @RequestParam String nwId) {
        DeviceSettings deviceSettings =new DeviceSettings(devName, nwId);
        try{
            return deviceSettings.getRoutes();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/protocols")
    public ArrayList<String[]> protocols(@RequestParam String devName, @RequestParam String nwId) {
        DeviceSettings deviceSettings =new DeviceSettings(devName, nwId);
        try{
            return deviceSettings.getProtocols();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/newDevice")
    public Boolean newDevice(@RequestParam String name, @RequestParam String ip, @RequestParam String sm, @RequestParam String type,@RequestParam String nwId) {
        DeviceSettings deviceSettings =new DeviceSettings();
        try{
            return deviceSettings.newDevice(name,ip,sm,type,nwId);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/newPort")
    public Boolean newPort(@RequestParam String devName,@RequestParam String nwId, @RequestParam String np) {
        DeviceSettings deviceSettings =new DeviceSettings(devName,nwId);
        try{
            return deviceSettings.newPort(np);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/api/saveChanges")
    public Boolean saveChanges(@RequestParam String devName, @RequestParam String nwId, @RequestParam String newName, @RequestParam String newIp, @RequestParam String newSm, @RequestParam String newType) {
        DeviceSettings deviceSettings =new DeviceSettings(devName, nwId);
        try{
            return deviceSettings.saveChanges(newName,newIp,newSm,newType);
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
