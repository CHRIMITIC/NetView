package com.example.netview_java.model;

import java.sql.*;
import java.util.ArrayList;

public class Users {
    String username;
    String password;
    String nwId;
    public Users(String username, String password, String nwId) {
        this.username = username;
        this.password = password;
        this.nwId = nwId.replaceAll("'","");;
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
    public String getNwId() {
        return nwId;
    }
    public void setNwId(String nwId) {
        this.nwId = nwId;
    }
    public ArrayList<String[]> getUsers() throws SQLException {
        ArrayList<String[]> a=new ArrayList<String[]>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.users WHERE(NetworkId="+Integer.parseInt(nwId)+" AND Username!="+username+") ORDER BY Type ASC;";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            String[] s=new String[3];
            s[0]=rs.getString("Username");
            s[1]=rs.getString("Password");
            s[2]=rs.getString("Type");
            a.add(s);
        }
        return a;
    }
    public String getUserType() throws SQLException {
        String a="";
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        String query="SELECT * FROM netview.users WHERE(NetworkId=? AND Username=?);";
        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setInt(1, Integer.parseInt(nwId));
        pstmt.setString(2, username);
        ResultSet rs = pstmt.executeQuery();
        while(rs.next()){
            a=rs.getString("Type");
        }
        return a;
    }
}
