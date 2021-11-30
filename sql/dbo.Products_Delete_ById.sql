USE [WorldPrints]
GO
/****** Object:  StoredProcedure [dbo].[Products_Delete_ById]    Script Date: 11/30/2021 2:55:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Yana Moskalova
-- Create date: 11/05/2021
-- Description: Delete_ById from table dbo.Products
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Products_Delete_ById]
@id int

AS
/*------Test Code------

DECLARE @id int = 12

SELECT *
FROM dbo.Products
WHERE Id = @id

EXECUTE [dbo].[Products_Delete_ById]	@id

SELECT *
FROM dbo.Products
WHERE Id = @id

*/
BEGIN

DELETE FROM [dbo].[Products]
      WHERE Id = @id

END