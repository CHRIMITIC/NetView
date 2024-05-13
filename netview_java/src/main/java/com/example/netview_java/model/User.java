package com.example.netview_java.model;
import java.sql.*;

public class User {
    String username;
    String password;
    String oU;
    String oP;
    public User(String username, String password) {
        this.username = username.replaceAll("'","");
        this.password = password.replaceAll("'","");
    }
    public User(String username, String password,String oU,String oP) {
        this.username = username.replaceAll("'","");
        this.password = password.replaceAll("'","");
        this.oU=oU.replaceAll("'","");
        this.oP=oP.replaceAll("'","");
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
    public String getoU() {
        return oU;
    }
    public void setoU(String oU) {
        this.oU = oU;
    }
    public String getoP() {
        return oP;
    }
    public void setoP(String oP) {
        this.oP = oP;
    }

    public Boolean changeData() throws SQLException {
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        String query="SELECT * FROM netview.users WHERE Username=? AND Password=?";
        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setString(1, username);
        pstmt.setString(2, password);
        ResultSet rs = pstmt.executeQuery();
        if (!rs.next()) {
            query="UPDATE netview.users SET Username=?,Password=? WHERE(Username=? AND Password=?);";
            pstmt = con.prepareStatement(query);
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.setString(3, oU);
            pstmt.setString(4, oP);
            pstmt.executeUpdate();
            return true;
        } else {
            return false;
        }
    }
}
