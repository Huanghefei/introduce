package com.hhf.introduce.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hhf.introduce.service.RedisService;
import com.hhf.introduce.util.SerializeUtil;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Service
public class RedisServiceImpl implements RedisService {

	@Autowired(required = false)
	private JedisPool jedisPool;

	public String get(String key) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		String value = "";
		try {
			value = jedis.get(key);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			jedis.close();
		}
		return value;
	}

	public String set(String key, String value) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		String back = "";
		try {
			back = jedis.set(key, value);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			jedis.close();
		}
		return back;
	}

	public void setList(String key, List<?> list) {
		Jedis jedis = jedisPool.getResource();
		try {
			if (list == null || list.size() == 0) {
				jedis.set(key.getBytes(), "".getBytes());
			} else {// 如果list为空,则设置一个空
				jedis.set(key.getBytes(), SerializeUtil.serializeList(list));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			jedis.close();
		}
	}

	public List<?> getList(String key) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		byte[] data = jedis.get(key.getBytes());
		jedis.close();
		return SerializeUtil.unserializeList(data);
	}

	@Override
	public Long hset(String key, String field, String value) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		Long result = jedis.hset(key, field, value);
		jedis.close();
		return result;
	}

	@Override
	public String hget(String key, String field) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		String string = jedis.hget(key, field);
		jedis.close();
		return string;
	}

	@Override
	public Boolean exists(String key) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		Boolean flag = jedis.exists(key);
		jedis.close();
		return flag;
	}

	@Override
	public Long incr(String key) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		Long result = jedis.incr(key);
		jedis.close();
		return result;
	}

	@Override
	public Set<String> keys(String key) {
		Jedis jedis = jedisPool.getResource();
		if (jedis == null) {
			return null;
		}
		Set<String> set = jedis.keys(key);
		jedis.close();
		return set;
	}

}
