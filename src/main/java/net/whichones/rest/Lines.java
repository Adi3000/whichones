package net.whichones.rest;

import javax.jws.WebService;
import javax.ws.rs.Path;

import net.whichones.common.lines.Services;

import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@Path("/lines")
@WebService(name=Services.LINES_WEB_SERVICE)
public class Lines extends SpringBeanAutowiringSupport {


}
