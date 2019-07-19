package com.gch.fileupload.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gch.fileupload.util.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.*;


@RestController
public class FileUploadController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileUploadController.class);

    /**
     * 文件上传接口，请切记不要忘了加 produces = "text/plain;charset=UTF-8"
     * 否则在IE上点击上传时候会出现下载的小窗口
     * @param multRequest
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
    public String insertAttachment(MultipartHttpServletRequest multRequest) throws IOException {

        // 文件上传的特殊性，需要返回String类型
        Map<String, Object> resultMap = new HashMap<>();

        // 成功和失败列表,根据自己的逻辑放入
        List<String> successList = new ArrayList<>();
        List<String> failList = new ArrayList<>();

        //上传多个文件到文件表
        Iterator<String> fileNames =multRequest.getFileNames();
        Map<String, MultipartFile> fileMap = multRequest.getFileMap();
        for (Map.Entry<String, MultipartFile> entry : fileMap.entrySet()) {
            MultipartFile mf = entry.getValue(); // 获得原始文件名
            String fileName = mf.getOriginalFilename(); // 截取文件类型; 这里可以根据文件类型进行判断
            LOGGER.info(fileName);
            successList.add(fileName);
            // TODO 文件上传到文件服务器
            // 可以利用 FileCopyUtils.copy(mf.getBytes(), new File(filePath));
        }

        // 封装返回结果
        ObjectMapper mapper = new ObjectMapper();
        resultMap.put("dataSuccess", successList);
        resultMap.put("dataFail", failList);
        LOGGER.info(mapper.writeValueAsString(resultMap));
        return mapper.writeValueAsString(resultMap);
    }
}
