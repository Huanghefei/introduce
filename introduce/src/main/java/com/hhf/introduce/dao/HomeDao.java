package com.hhf.introduce.dao;

import java.util.List;
import java.util.Map;

public interface HomeDao {

	public Map<String, Object> getAbout();

	public List<Map<String, Object>> getExperience();

	public List<Map<String, Object>> getSkill();

	public List<Map<String, Object>> getProjectType();

	public List<Map<String, Object>> getProject();
	
	public List<Map<String, Object>> getBlog();

	public int submitOptions(Map<String, String> map);

}
