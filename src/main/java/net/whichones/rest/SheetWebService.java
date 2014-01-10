package net.whichones.rest;

import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.whichones.common.lines.Services;
import net.whichones.common.sheet.SheetsService;
import net.whichones.common.sheet.data.Sheet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@Path("/sheet")
@WebService(name=Services.LINES_WEB_SERVICE)
public class SheetWebService extends SpringBeanAutowiringSupport {

	@Autowired
	private final SheetsService sheetsService;

	public SheetWebService(SheetsService sheetsService){
		this.sheetsService = sheetsService;
	}
	
	@POST
	@Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	public Sheet createSheet(Sheet sheet){
		return sheetsService.createSheet(sheet);
	}
}
