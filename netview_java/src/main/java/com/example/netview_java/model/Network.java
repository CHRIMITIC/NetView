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
}
