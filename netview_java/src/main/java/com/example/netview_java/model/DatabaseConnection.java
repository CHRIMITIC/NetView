package com.example.netview_java.model;
import java.sql.*;
import java.util.*;

public class DatabaseConnection
{
    private Properties p;
    private Connection con;
    private String url="jdbc:mysql://127.0.0.1:3306/netview";
    private String user="root";
    private String password="";
    public Connection connect(){
        p=new Properties();
        p.setProperty("user", user);
        p.setProperty("password", password);
        try{
            con= DriverManager.getConnection(url,p);
        }catch (Exception e){
        }
        return con;
    }
    public void disconnect(){
        if(con!=null){
            try{
                con.close();
                con=null;
            }catch (SQLException e){
                e.printStackTrace();
            }
        }
    }
}

