package com.example.netview_java.model;
import java.sql.*;

public class Login {
    String username;
    String password;
    public Login(String username, String password) {
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
    public Boolean verifyCredentials() throws SQLException {
        DatabaseConnection db = new DatabaseConnection();
        Connection con=db.connect();
        String query="SELECT * FROM netview.users WHERE Username=? AND Password=?";
        PreparedStatement pstmt = con.prepareStatement(query);
        pstmt.setString(1, username);
        pstmt.setString(2, password);
        ResultSet rs = pstmt.executeQuery();
        if (rs.next()) {
            if (username.contains("'")) {
                username = username.replaceAll("'", "");
            }
            if (password.contains("'")) {
                password = password.replaceAll("'", "");
            }
            if (username.equals(rs.getString("Username")) && password.equals(rs.getString("Password"))) {
                db.disconnect();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
