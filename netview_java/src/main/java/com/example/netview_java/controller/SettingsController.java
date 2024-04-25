package com.example.netview_java.controller;
import com.example.netview_java.model.Settings;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
public class SettingsController {
    @CrossOrigin(origins = "*")
    @GetMapping("/api/settings")
    public ArrayList<ArrayList<Integer>> network(@RequestParam String nwId) {
        Settings settings=new Settings(nwId);
        try {
            return settings.getSettings();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
