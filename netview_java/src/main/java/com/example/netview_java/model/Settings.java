package com.example.netview_java.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Settings {
    int nwId;
    ArrayList<Integer> devId=new ArrayList<Integer>();
    DatabaseConnection db=null;
    Connection con=null;
    public Settings(String nwId) {
        this.nwId = Integer.parseInt(nwId.replaceAll("'", ""));
    }
    public int getNwId() {
        return nwId;
    }
    public void setNwId(int nwId) {
        this.nwId = nwId;
    }
    public ArrayList<ArrayList<Integer>> getSettings() throws SQLException {
        ArrayList<ArrayList<Integer>> a=new ArrayList<ArrayList<Integer>>();
        ArrayList<Integer> aS=new ArrayList<Integer>();
        aS.add(getAvailablePorts());
        aS.add(getPorts("Up"));
        aS.add(getPorts("Down"));
        aS.add(getProtocols());
        a.add(aS);
        return a;
    }
    public int getAvailablePorts() throws SQLException {
        int a=0;
        db = new DatabaseConnection();
        con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(NetworkId="+nwId+");";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            devId.add(rs.getInt("DeviceId"));
            a+=rs.getInt("AvailablePorts");
        }
        return a;
    }
    public int getPorts(String status) throws SQLException {
        int a=0;
        Statement st=con.createStatement();
        for(int i=0;i<devId.size();i++){
            String query="SELECT * FROM netview.ports WHERE(DeviceId="+devId.get(i)+" AND Status='"+status+"');";
            ResultSet rs=st.executeQuery(query);
            while(rs.next()){
                a++;
            }
        }
        return a;
    }
    public int getProtocols() throws SQLException {
        int a=0;
        Statement st=con.createStatement();
        for(int i=0;i<devId.size();i++){
            String query="SELECT * FROM netview.protocols WHERE(DeviceId="+devId.get(i)+" AND Status='On');";
            ResultSet rs=st.executeQuery(query);
            while(rs.next()){
                a++;
            }
        }
        return a;
    }
}
