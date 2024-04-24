package com.example.netview_java.model;
import java.sql.*;
import java.util.*;

public class Network {
    String username;
    String password;
    public Network(String username, String password) {
        this.username = username;
        this.password = password;
    }
    public Network() {
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public ArrayList<String> getNetwork() throws SQLException {
        String n;
        ArrayList<String> a=new ArrayList<String>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.users WHERE(Username="+username+" AND Password="+password+");";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            n=Integer.toString(rs.getInt("NetworkId"));
            a.add(n);
        }
        return a;
    }
    public int getNwId() throws SQLException {
        int n=0;
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.network ORDER BY NetworkId DESC;";
        ResultSet rs=st.executeQuery(query);
        if(rs.next()){
            n=rs.getInt("NetworkId");
        }
        return n;
    }
    public Boolean newNetwork(String ip,String sm,String type) throws SQLException{
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="INSERT INTO netview.network (NetworkIp,NetworkSm,Type) VALUES ("+ip+","+sm+","+type+");";
        try{
            st.executeUpdate(query);
            query="SELECT * FROM netview.network WHERE(NetworkIp="+ip+" AND NetworkSm="+sm+" AND Type="+type+");";
            ResultSet rs=st.executeQuery(query);
            if(rs.next()){
                int nwId=Integer.parseInt(rs.getString("NetworkId"));
                query="INSERT INTO netview.users (Username,Password,Type,NetworkId) VALUES ('a','a','Owner',"+nwId+");";
                st.executeUpdate(query);
            }
            return true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
