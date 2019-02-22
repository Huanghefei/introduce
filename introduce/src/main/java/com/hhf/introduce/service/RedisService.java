package com.hhf.introduce.service;

import java.util.List;
import java.util.Set;

public interface RedisService {

	public String get(String key);

	public String set(String key, String value);

	public void setList(String key, List<?> list);

	public List<?> getList(String key);

	public Long hset(String key, String field, String value);

	public String hget(String key, String field);
	
	public Boolean exists(String key);
	
	public Long incr(String key);
	
	public Set<String> keys(String key);

}
