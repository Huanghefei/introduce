package com.hhf.introduce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.hhf.introduce.service.RedisService;

@Controller
public class PageController {

	@Autowired
	private RedisService redisService;

	/**
	 * 主页
	 * 
	 * @author Huanghefei
	 * @return
	 */
	@GetMapping(value = "/")
	public String home() {
		redisService.incr("LOVEHHFCOUNT");
		return "home";
	}

	/**
	 * 图片
	 * 
	 * @author Huanghefei
	 * @return
	 */
	@GetMapping(value = "/pic")
	public String pic() {
		return "pic";
	}

}
