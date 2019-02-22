package com.hhf.introduce.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * redis配置
 * 
 * @author huanghefei
 *
 */
@Configuration
@ConfigurationProperties(prefix = "spring.redis")
public class RedisConfig {

	private String host;
	private Integer port;
	private String password;
	private Integer timeout;
	private Integer poolMaxTotal;
	private Integer poolMaxWait;
	private Integer poolMaxIdle;
	private Integer poolMinIdle;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public Integer getPort() {
		return port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getTimeout() {
		return timeout;
	}

	public void setTimeout(Integer timeout) {
		this.timeout = timeout;
	}

	public Integer getPoolMaxTotal() {
		return poolMaxTotal;
	}

	public void setPoolMaxTotal(Integer poolMaxTotal) {
		this.poolMaxTotal = poolMaxTotal;
	}

	public Integer getPoolMaxWait() {
		return poolMaxWait;
	}

	public void setPoolMaxWait(Integer poolMaxWait) {
		this.poolMaxWait = poolMaxWait;
	}

	public Integer getPoolMaxIdle() {
		return poolMaxIdle;
	}

	public void setPoolMaxIdle(Integer poolMaxIdle) {
		this.poolMaxIdle = poolMaxIdle;
	}

	public Integer getPoolMinIdle() {
		return poolMinIdle;
	}

	public void setPoolMinIdle(Integer poolMinIdle) {
		this.poolMinIdle = poolMinIdle;
	}

	@Bean
	public JedisPoolConfig getRedisConfig() {
		JedisPoolConfig config = new JedisPoolConfig();
		return config;
	}

	@Bean
	public JedisPool getJedisPool() {
		JedisPoolConfig config = getRedisConfig();
		config.setMaxTotal(poolMaxTotal);
		config.setMaxWaitMillis(poolMaxWait);
		config.setMaxIdle(poolMaxIdle);
		config.setMinIdle(poolMinIdle);
		JedisPool pool = new JedisPool(config, host, port, timeout, password);
		return pool;
	}

}
