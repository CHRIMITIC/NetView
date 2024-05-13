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
    public DeviceSettings(){}
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
    public ArrayList<String> getRoutes() throws SQLException {
        ArrayList<String> a=new ArrayList<String>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(DeviceName="+devName+" AND NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        if(rs.next()){
            String devId=rs.getString("DeviceId");
            query="SELECT * FROM netview.routes WHERE(DeviceId="+devId+");";
            rs=st.executeQuery(query);
            while(rs.next()){
                String s="";
                s=rs.getString("DestinationIp");
                a.add(s);
            }
        }
        return a;
    }
    public ArrayList<String[]> getProtocols() throws SQLException {
        ArrayList<String[]> a=new ArrayList<String[]>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(DeviceName="+devName+" AND NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        if(rs.next()){
            String devId=rs.getString("DeviceId");
            query="SELECT * FROM netview.protocolmngmt WHERE(DeviceId="+devId+");";
            rs=st.executeQuery(query);
            while(rs.next()){
                String p="";
                p=rs.getString("Port");
                query="SELECT * FROM netview.protocols WHERE(Port="+p+");";
                rs=st.executeQuery(query);
                while(rs.next()){
                    String[] s=new String[4];
                    s[0]=rs.getString("");
                    a.add(s);
                }
            }
        }
        return a;
    }
    public Boolean newDevice(String name, String ip,String sm,String type,String nwId) throws SQLException{
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="INSERT INTO netview.devices (DeviceName,DeviceIp,DeviceSm,Type,NetworkId) VALUES ("+name+","+ip+","+sm+","+type+","+Integer.parseInt(nwId.replaceAll("'",""))+");";
        try{
            st.executeUpdate(query);
            return true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public Boolean newPort(String np) throws SQLException{
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(DeviceName="+devName+" AND NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        try{
            if(rs.next()){
                int id=rs.getInt("DeviceId");
                query="INSERT INTO netview.ports (PortName,DeviceId) VALUES ("+np+","+id+");";
                st.executeUpdate(query);
                query="UPDATE netview.devices SET AvailablePorts=AvailablePorts-1 WHERE(DeviceId="+id+");";
                st.executeUpdate(query);
                return true;
            }else{
                return false;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public Boolean removePort(String pN, String pC) throws SQLException{
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.devices WHERE(DeviceName="+devName+" AND NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        try{
            if(rs.next()){
                int id=rs.getInt("DeviceId");
                if(pC.equals("''")){
                    query="DELETE FROM netview.ports WHERE (PortName=? and DeviceId=?);";
                    PreparedStatement pstmt = con.prepareStatement(query);
                    pstmt.setString(1, pN.replaceAll("'",""));
                    pstmt.setInt(2, id);
                    pstmt.executeUpdate();
                    return true;
                }else{
                    query="SELECT * FROM netview.ports WHERE(PortName=?);";
                    PreparedStatement pstmt = con.prepareStatement(query);
                    pstmt.setString(1, pC.replaceAll("'",""));
                    rs = pstmt.executeQuery();
                    if(rs.next()){
                        query="SELECT * FROM netview.ports WHERE (PortName=? AND ConnectedPort=?);";
                        pstmt = con.prepareStatement(query);
                        pstmt.setString(1, pN.replaceAll("'",""));
                        pstmt.setInt(2, rs.getInt("PortId"));
                        rs=pstmt.executeQuery();
                        if(rs.next()){
                            int portId=rs.getInt("PortId");
                            query="UPDATE netview.ports SET ConnectedPort=null WHERE (ConnectedPort=?);";
                            pstmt = con.prepareStatement(query);
                            pstmt.setInt(1, rs.getInt("PortId"));
                            pstmt.executeUpdate();
                            query="DELETE FROM netview.ports WHERE (PortId=?);";
                            pstmt = con.prepareStatement(query);
                            pstmt.setInt(1, portId);
                            pstmt.executeUpdate();
                            query="UPDATE netview.devices SET AvailablePorts=AvailablePorts+1 WHERE(DeviceId=?);";
                            pstmt = con.prepareStatement(query);
                            pstmt.setInt(1, id);
                            pstmt.executeUpdate();
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            }else{
                return false;
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public Boolean saveChanges(String nN,String nI,String nS,String nT) throws SQLException {
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="UPDATE netview.devices SET DeviceName = "+nN+", DeviceIp="+nI+", DeviceSm="+nS+",Type="+nT+" WHERE (DeviceName="+devName+") and (NetworkId="+nwId+");";
        try{
            st.executeUpdate(query);
            return true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    public ArrayList<String> getConnections() throws SQLException{
        ArrayList<String> a=new ArrayList<>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.ports;";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            String p1=Integer.toString(rs.getInt("PortId"));
            String p2=Integer.toString(rs.getInt("ConnectedPort"));
            a.add(p1+"-"+p2);
        }
        return a;
    }
}
