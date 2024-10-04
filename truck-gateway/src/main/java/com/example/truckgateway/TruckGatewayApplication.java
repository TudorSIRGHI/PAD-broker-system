package com.example.truckgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TruckGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(TruckGatewayApplication.class, args);
    }
}
