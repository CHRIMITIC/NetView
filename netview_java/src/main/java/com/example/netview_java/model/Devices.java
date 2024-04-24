package com.example.netview_java.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Devices {
    String nwId;
    public Devices(String nwId) {
        this.nwId = nwId;
    }
    public String getNwId() {
        return nwId;
    }
    public void setNwId(String nwId) {
        this.nwId = nwId;
    }
    public ArrayList<String> getDevices() throws SQLException {
        String n;
        ArrayList<String> a=new ArrayList<String>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(NetworkId="+nwId+");";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            n=rs.getString("DeviceName")+";"+rs.getString("DeviceIp")+";"+rs.getString("DeviceSm")+";"+rs.getString("Type")+";"+Integer.toString(rs.getInt("AvailablePorts"));
            a.add(n);
        }
        return a;
    }
}
