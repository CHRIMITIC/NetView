package com.example.netview_java.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
        String[] s=new String[4];
        ArrayList<String[]> a=new ArrayList<String[]>();
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.users WHERE(NetworkId="+Integer.parseInt(nwId)+");";
        ResultSet rs=st.executeQuery(query);
        while(rs.next()){
            s[0]=rs.getString("Username");
            s[1]=rs.getString("Password");
            s[2]=rs.getString("Type");
            s[3]=rs.getString("NetworkId");
            a.add(s);
        }
        return a;
    }
}
