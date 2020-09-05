 package com.fruit.product.config;


import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fruit.product.filter.JwtRequestFilter;
import com.fruit.product.repository.UsersRepository;
import com.fruit.product.service.CustomUserDetailsService;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@EnableAutoConfiguration
@EnableJpaRepositories(basePackageClasses = UsersRepository.class)
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
	private JwtRequestFilter jwtRequestFilter;
    
    @Autowired
	private PasswordEncoder bcryptEncoder;
    
    private static final String KEY = "SlowAndSteadyWinsTheRace";  
    private static final String ALGORITHMSTR = "AES/ECB/PKCS5Padding";
    
//    @Autowired
//	private UserDetailsService jwtUserDetailsService;
    
//    @Autowired
//	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		// configure AuthenticationManager so that it knows from where to load
//		// user for matching credentials
//		// Use BCryptPasswordEncoder
//		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//	
	
    
//    @Bean
//    public AuthenticationManager customAuthenticationManager() throws Exception {
//        return authenticationManager();
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//
//        auth.userDetailsService(userDetailsService)
//        .passwordEncoder(getPasswordEncoder());
//    }
    
    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(userDetailsService)
                .passwordEncoder(getPasswordEncoder());
    }


    private PasswordEncoder getPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence charSequence) {
                return charSequence.toString();
            }

            @Override
            public boolean matches(CharSequence charSequence, String s) {
            	  String paramsPass =charSequence.toString();
//            	  String aesDecrypt = aesDecrypt(paramsPass);
                  return paramsPass.equals(s);
            }
        };
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        http.csrf().disable();
//        http.authorizeRequests()
//                .antMatchers("**/secured/**").authenticated()
//                .anyRequest().permitAll()
//                .and()
//                .formLogin().permitAll();
        
        http.csrf().disable()
		.authorizeRequests().antMatchers("/authenticate", "/validate-token", "/sign-up", "/feedback", "/getAll").permitAll().
//		.authorizeRequests().antMatchers("/authenticate", "/uploadItem", "/get-image", "/getAll","/sign-up", "/get-profile", "/get-cart", "/add-to-cart", "/temp", "/update-item", "/delete-item").permitAll().
				anyRequest().authenticated().and().
				exceptionHandling().and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
    
    
    
    public  String aesDecrypt(String encrypt) {  
        try {
            return aesDecrypt(encrypt, KEY);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }  
    } 
    
    public byte[] base64Decode(String base64Code) throws Exception{  
        return StringUtils.isEmpty(base64Code) ? null : Base64.decodeBase64(base64Code);  
    } 
    
    public String aesDecrypt(String encryptStr, String decryptKey) throws Exception {  
        return StringUtils.isEmpty(encryptStr) ? null : aesDecryptByBytes(base64Decode(encryptStr), decryptKey);  
    } 
    
    public static String aesDecryptByBytes(byte[] encryptBytes, String decryptKey) throws Exception {  
        KeyGenerator kgen = KeyGenerator.getInstance("AES");  
        kgen.init(128);  
  
        Cipher cipher = Cipher.getInstance(ALGORITHMSTR);  
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(decryptKey.getBytes(), "AES"));  
        byte[] decryptBytes = cipher.doFinal(encryptBytes);  
        return new String(decryptBytes);  
    }

}
