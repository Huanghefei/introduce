package com.hhf.introduce.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hhf.introduce.constant.ResultTag;
import com.hhf.introduce.service.HomeService;

@RestController
@RequestMapping(value = "/home")
public class HomeController {

	@Autowired
	private HomeService homeService;

	@PostMapping(value = "/getAbout")
	public Map<String, Object> getAbout() {
		Map<String, Object> retMap = new HashMap<String, Object>();
		Map<String, Object> about = homeService.getAbout();
		retMap.put(ResultTag.RESULT, about);
		retMap.put(ResultTag.STATUS, ResultTag.SUCCESS);
		return retMap;
	}
	
	@PostMapping(value = "/getExperience")
	public Map<String, Object> getExperience() {
		Map<String, Object> retMap = new HashMap<String, Object>();
		List<Map<String, Object>> experience = homeService.getExperience();
		List<Map<String, Object>> skill = homeService.getSkill();
		retMap.put("experience", experience);
		retMap.put("skill", skill);
		retMap.put(ResultTag.STATUS, ResultTag.SUCCESS);
		return retMap;
	}
	
	@PostMapping(value = "/getProject")
	public Map<String, Object> getProject() {
		Map<String, Object> retMap = new HashMap<String, Object>();
		List<Map<String, Object>> type = homeService.getProjectType();
		List<Map<String, Object>> project = homeService.getProject();
		retMap.put("type", type);
		retMap.put("project", project);
		retMap.put(ResultTag.STATUS, ResultTag.SUCCESS);
		return retMap;
	}
	
	@PostMapping(value = "/getBlog")
	public Map<String, Object> getBlog() {
		Map<String, Object> retMap = new HashMap<String, Object>();
		List<Map<String, Object>> blog = homeService.getBlog();
		retMap.put(ResultTag.RESULT, blog);
		retMap.put(ResultTag.STATUS, ResultTag.SUCCESS);
		return retMap;
	}

	@PostMapping(value = "/submitOptions")
	public Map<String, Object> submitOptions(@RequestBody Map<String, String> map) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		homeService.submitOptions(map);
		retMap.put(ResultTag.STATUS, ResultTag.SUCCESS);
		return retMap;
	}

	public static void main(String[] args) {
		String aString = new String("2");
		String b = new String("2");
		System.out.println(aString==b);
		System.out.println(aString.equals(b));
	}

}
