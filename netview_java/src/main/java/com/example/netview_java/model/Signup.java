package com.example.netview_java.model;
import java.sql.*;

public class Signup {
    String username;
    String password;
    String nwId;
    String type;
    public Signup(String username, String password, String nwId, String type) {
        this.username = username;
        this.password = password;
        this.nwId = nwId.replaceAll("'","");;
        this.type = type;
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
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Boolean insertDatabase() throws SQLException {
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        String query="SELECT * FROM netview.users WHERE(Username="+username+" AND Password="+password+" AND NetworkId="+Integer.parseInt(nwId)+" AND Type="+type+");";
        ResultSet rs=st.executeQuery(query);
        if(!rs.next()){
            query="INSERT INTO users (Username, Password, Type, NetworkId) VALUES ("+username+", "+password+", "+type+", "+Integer.parseInt(nwId)+");";
            st.executeUpdate(query);
            return true;
        }else{
            return false;
        }
    }
}
