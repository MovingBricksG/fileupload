package com.gch.fileupload.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 对静态html的映射
 */
@Controller
public class WebController {

    @RequestMapping(value="/{name}")
    public String commonController(@PathVariable String name) {
        return name;
    }
}
