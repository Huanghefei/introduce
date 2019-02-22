package com.hhf.introduce.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hhf.introduce.dao.HomeDao;
import com.hhf.introduce.service.HomeService;

@Service
public class HomeServiceImpl implements HomeService {

	@Autowired
	private HomeDao homeDao;

	@Override
	public Map<String, Object> getAbout() {
		return homeDao.getAbout();
	}

	@Override
	public List<Map<String, Object>> getExperience() {
		return homeDao.getExperience();
	}

	@Override
	public List<Map<String, Object>> getSkill() {
		return homeDao.getSkill();
	}

	@Override
	public List<Map<String, Object>> getProjectType() {
		return homeDao.getProjectType();
	}

	@Override
	public List<Map<String, Object>> getProject() {
		return homeDao.getProject();
	}

	@Override
	public List<Map<String, Object>> getBlog() {
		return homeDao.getBlog();
	}

	@Override
	public int submitOptions(Map<String, String> map) {
		return homeDao.submitOptions(map);
	}

}
