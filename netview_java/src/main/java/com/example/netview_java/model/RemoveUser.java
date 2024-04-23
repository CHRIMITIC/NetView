package com.example.netview_java.model;
import java.sql.*;

public class RemoveUser {
    String username;
    String password;
    String nwId;
    String type;
    public RemoveUser(String username, String password, String nwId, String type) {
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
    public Boolean deleteDatabase() throws SQLException {
        boolean result = false;
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        Statement st=con.createStatement();
        System.out.println(username+","+password+","+nwId+","+type+",");
        String query="DELETE FROM users WHERE(Username="+username+" AND Password="+password+" AND Type="+type+" AND NetworkId="+Integer.parseInt(nwId)+");";
        try{
            st.executeUpdate(query);
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        if(result){
            return true;
        }else{
            return false;
        }
    }
}
