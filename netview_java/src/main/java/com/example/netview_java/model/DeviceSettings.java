package com.example.netview_java.model;
import java.sql.*;
import java.util.*;

public class DeviceSettings {
    String devName;
    String nwId;
    public DeviceSettings(String devName, String nwId) {
        this.devName = devName;
        this.nwId = nwId.replaceAll("'", "");
    }
    public String getDevName() {
        return devName;
    }
    public void setDevName(String devName) {
        this.devName = devName;
    }
    public String getNwId() {
        return nwId;
    }
    public void setNwId(String nwId) {
        this.nwId = nwId;
    }
    public ArrayList<String[]> getPorts() throws SQLException {
        ArrayList<String[]> a=new ArrayList<String[]>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(DeviceName="+devName+" AND NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        if(rs.next()){
            String devId=rs.getString("DeviceId");
            query="SELECT * FROM netview.ports INNER JOIN netview.devices ON ports.DeviceId=devices.DeviceId WHERE(devices.DeviceId="+devId+");";
            rs=st.executeQuery(query);
            while(rs.next()){
                String[] s=new String[3];
                s[0]=rs.getString("PortName");
                s[1]=rs.getString("Status");
                s[2]=rs.getString("ConnectedPort");
                a.add(s);
            }
            for(int i=0;i<a.size();i++){
                query="SELECT * FROM netview.ports WHERE(PortId="+a.get(i)[2]+");";
                rs=st.executeQuery(query);
                if(rs.next()){
                    a.get(i)[2]=rs.getString("PortName");;
                }
            }
        }
        return a;
    }
}
